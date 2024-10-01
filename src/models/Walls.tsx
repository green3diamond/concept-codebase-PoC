/**
 * This function returns the 3D objects of two walls using R3F with customizable
 * material properties and positioning.
 *
 * @returns {JSX.Element} - A JSX element containing the 3D scene of walls.
 */
export default function Walls() {
    // Define material properties for the walls
    const materialProps = { color: '#c7cdb7', roughness: 0.4, metalness: 0.0 }

    return <>
        {/* Wall 1 */}
        <mesh position={[0, 1.5, - 5]} rotation-x={- Math.PI * 0} scale={[10, 5, 1]} receiveShadow={true} >
            <meshPhongMaterial
                color={materialProps.color}
            />
            <planeGeometry />
        </mesh>

        {/* Wall 2 */}
        <mesh position={[5, 1.5, 0]} rotation-y={-Math.PI * 0.5} scale={[10, 5, 1]} receiveShadow={true} >
            <meshPhongMaterial
                color={materialProps.color}
            />
            <planeGeometry />
        </mesh>
    </>
}
