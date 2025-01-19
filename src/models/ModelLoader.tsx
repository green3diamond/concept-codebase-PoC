import { useGLTF, Html } from "@react-three/drei"
import { useEffect, useContext, useState, Suspense } from "react"
import { AppContext } from "../context/AppContext"
import { Vector3 } from "three"
import Placeholder from "./Placeholder"
import { Button } from "@/components/separate_files/ui/button"
import { Pencil } from "lucide-react"

function BadgeButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
            onClick={onClick}
        >
            <Pencil className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Edit</span>
        </Button>
    )
}


/**
 * A React component to load and display 3D models.
 * @param {Object} props - The properties of the component.
 * @param {string} props.file - The path to the 3D model file.
 * @param {number} props.nodeNum - The index of the node in the model to be displayed.
 * @param {string} props.name - The name of the model.
 * @param {Object} props.reference - A reference to the model mesh.
 * @param {Object} props.pos - The position of the model.
 * @param {number} props.size - The size of the model.
 * @param {boolean} props.html - Whether to display HTML component with a message over the model.
 * @param {boolean} props.occlude - Whether to occlude the HTML content.
 * @returns {JSX.Element} - The JSX element for the ModelLoader component.
*/
export default function ModelLoader(props) {

    const { sharedState, selected, setSelected, hovered, hover, setActiveAccordion, menuState, setMenuState } = useContext(AppContext)
    const [boxSize, setBoxSize] = useState(new Vector3(1, 1, 1))
    const [boxCenter, setBoxCenter] = useState(new Vector3(0, 0, 0))
    const { nodes, materials } = useGLTF(props.file)
    const [isEditVisible, setIsEditVisible] = useState(false)

    const onEditClick = (name: string) => {
        setMenuState("open")
        setSelected(name)
        setActiveAccordion(name)
    }

    // convert the node object to an array
    const nodesArray = Object.keys(nodes).map(key => nodes[key])
    const materialsArray = Object.keys(materials).map(key => materials[key])

    const geomUpper = nodesArray[props.nodeNum].geometry

    const ptrIn = (e) => hover(e.object.name)
    const ptrOut = (e) => { if (e.object.name === hovered) hover("") }

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
        const rot = sharedState[props.name]["rotation"]
        if (props.reference.current && rot) {
            props.reference.current.rotation.set(rot[0], rot[1], rot[2])
        }
    }, [[], sharedState])

    useEffect(() => {
        computeAndSetBoundingBox(geomUpper, setBoxSize, setBoxCenter)
    }, [[], sharedState])


    const finalObject =
        (<mesh
            name={props.name}
            ref={props.reference}
            position={props.pos}
            onPointerOver={(e) => ptrIn(e)} onPointerOut={(e) => ptrOut(e)}
            onClick={(e) => {e.stopPropagation(); setIsEditVisible(!isEditVisible) }}
            rotation={sharedState[props.name]["rotation"]}
        >
            <Suspense fallback={<Placeholder />}>
                <mesh
                    castShadow={true}
                    name={props.name}
                    geometry={geomUpper}
                    material={sharedState[props.name]["color"] === 1 ? materialsArray[0] : materialsArray[1]}
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
            {isEditVisible ? <Html
                position={[length / 2 - 0.3, 1.8, 0]}
            >
                <BadgeButton onClick={(e) => {
                    e.stopPropagation(); 
                    onEditClick(props.name);
                }} />
            </Html> : null}
        </mesh>)

    return finalObject

}