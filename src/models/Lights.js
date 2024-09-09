/**
 * This function represents a set of light components for a 3D scene.
 * It returns a React fragment containing two directional lights and one ambient light.
 * The directional lights cast shadows for better visual representation in 3D scenes.
 *
 * @returns {JSX.Element} - A React fragment containing the light components.
 */
export default function Lights() {

    return <>
        <directionalLight
            position={[1, 2, 3]}
            intensity={1.5}
            castShadow // highlight-line
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadow-radius={2}
        />
        <directionalLight
            position={[-2, 2, 3]}
            intensity={1.5}
            castShadow // highlight-line
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadow-radius={2}
        />
        <ambientLight intensity={1.0} />
    </>
}
