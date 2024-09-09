import { useGLTF, Html } from "@react-three/drei"
import { useEffect, useContext, useState, Suspense } from "react"
import { AppContext } from "../reactButtons/AppContext"
import { Vector3 } from "three"

import Placeholder from "./Placeholder"

/**
 * A React component to load and display 3D models.
 * @param {Object} props - The properties of the component.
 * @param {string} props.file - The path to the 3D model file.
 * @param {number} props.nodeNum - The index of the node in the model to be displayed.
 * @param {string} props.name - The name of the model.
 * @param {Object} props.reference - A reference to the model mesh.
 * @param {Object} props.pos - The position of the model.
 * @param {Object} props.rot - The rotation of the model.
 * @param {number} props.size - The size of the model.
 * @param {boolean} props.html - Whether to display HTML component with a message over the model.
 * @param {boolean} props.occlude - Whether to occlude the HTML content.
 * @returns {JSX.Element} - The JSX element for the ModelLoader component.
 */
export default function ModelLoader(props) {

    const { sharedState, selected, setSelected, hovered, hover } = useContext(AppContext)
    const [boxSize, setBoxSize] = useState(new Vector3(1, 1, 1))
    const [boxCenter, setBoxCenter] = useState(new Vector3(0, 0, 0))
    const { nodes, materials } = useGLTF(props.file)

    // convert the node object to an array
    const nodesArray = Object.keys(nodes).map(key => nodes[key])
    const materialsArray = Object.keys(materials).map(key => materials[key])

    const geomUpper = nodesArray[props.nodeNum].geometry

    const ptrIn = (e) => hover(e.object.name)
    const ptrOut = (e) => { if (e.object.name === hovered) hover("") }

    const dblClick = (e) => {
        if (e.object.name === selected)
            setSelected("")
        else
            setSelected(e.object.name)
    }

    /**
     * Computes and sets the size and center of the bounding box for the model.
     * @param {Object} geomUpper - The geometry of the model.
     * @param {Vector3} boxSize - The state variable to store the size of the bounding box.
     * @param {Vector3} boxCenter - The state variable to store the center of the bounding box.
     */
    function computeAndSetBoundingBox(geomUpper, setBoxSize, setBoxCenter) {
        if (!geomUpper.boundingSphere) {
            geomUpper.computeBoundingSphere()
        }

        if (!geomUpper.boundingBox) {
            geomUpper.computeBoundingBox()
        }

        const scale = props.size / geomUpper.boundingSphere.radius
        const bbCenter = geomUpper.boundingBox.max.clone().add(geomUpper.boundingBox.min).divideScalar(2)
        const bbSize = geomUpper.boundingBox.max.clone().sub(geomUpper.boundingBox.min).multiplyScalar(scale)

        setBoxSize(bbSize.multiplyScalar(1.01))
        setBoxCenter(bbCenter.multiplyScalar(1))

        geomUpper.scale(scale, scale, scale)
    }

    useEffect(() => {
        computeAndSetBoundingBox(geomUpper, setBoxSize, setBoxCenter)
        //TODO runns at every props update, which is every render   
    }, [hovered])

    return <>
        <mesh
            name={props.name}
            ref={props.reference}
            position={props.pos}
            rotation={props.rot}
            onPointerOver={(e) => ptrIn(e)} onPointerOut={(e) => ptrOut(e)}
            onDoubleClick={(e) => dblClick(e)}
        >
            <Suspense fallback={<Placeholder />}>
                <mesh
                    castShadow={true}
                    name={props.name}
                    geometry={geomUpper}
                    material={sharedState[props.name] === 1 ? materialsArray[0] : materialsArray[1]}
                />
                {selected === props.name || hovered === props.name ? (<mesh
                    scale={boxSize}
                    position={boxCenter}
                >
                    <meshStandardMaterial
                        color={selected === props.name ? '#B89FF5' : 'white'}
                        opacity={0.4}
                        transparent={true}
                    />
                    <boxGeometry />
                </mesh>) : null}
            </Suspense>
            {props.html ? <Html
                position={[-3, 1, 1.8]}
                wrapperClass="label"
                center //center the html around the position
                distanceFactor={9}
                occlude={props.occlude}
            >
                Move me!
            </Html> : null}
        </mesh>
    </>
}