import { AppContext } from "@/context/AppContext"
import { useContext } from "react"

/**
 * This function returns the 3D objects of two walls using R3F with customizable
 * material properties and positioning.
 *
 * @returns {JSX.Element} - A JSX element containing the 3D scene of walls.
 */
export default function Walls() {
    // Define material properties for the walls
    const materialProps = { color: '#c7cdb7', roughness: 0.4, metalness: 0.0 }
    const {roomDimensions} = useContext(AppContext)
    const width = roomDimensions["width"]
    const length = roomDimensions["length"]
    const height = roomDimensions["height"]

    return <>
        {/* Wall 1 */}
        <mesh position={[0, height/2-1, - length/2]} rotation-x={- Math.PI * 0} scale={[width, height, 1]} receiveShadow={true} >
            <meshPhongMaterial
                color={materialProps.color}
            />
            <planeGeometry />
        </mesh>

        {/* Wall 2 */}
        <mesh position={[width/2, height/2-1, 0]} rotation-y={-Math.PI * 0.5} scale={[length, height, 1]} receiveShadow={true} >
            <meshPhongMaterial
                color={materialProps.color}
            />
            <planeGeometry />
        </mesh>

         {/* Wall 3 */}
         <mesh position={[0, height/2-1, length/2]} rotation-x={- Math.PI } scale={[width, height, 1]} receiveShadow={true} >
            <meshPhongMaterial
                color={materialProps.color}
            />
            <planeGeometry />
        </mesh>

        {/* Wall 4 */}
        <mesh position={[-width/2, height/2-1, 0]} rotation-y={Math.PI * 0.5} scale={[length, height, 1]} receiveShadow={true} >
            <meshPhongMaterial
                color={materialProps.color}
            />
            <planeGeometry />
        </mesh>
    </>
}
