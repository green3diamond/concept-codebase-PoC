import Experience from './Experience'
import { Canvas } from '@react-three/fiber'
import { Analytics } from "@vercel/analytics/react"
import AdaptiveNavbar from "./components/AdaptiveNavbar"

/**
 * The main application component.
 * @returns {JSX.Element} - The JSX element representing the application.
 */
export default function App() {    
    
    return (
        <>
            <Analytics />
            <>
                {/* Canvas component for 3D rendering with shadows enabled */}
                <Canvas
                    shadows={true}
                    camera={{
                        fov: 50,
                        near: 0.1,
                        far: 200,
                        position: [-8, 8, 15]

                    }}
                >
                    <Experience />
                </Canvas>
                {/* Custom buttons component */}
                <AdaptiveNavbar />
            </>
        </>
    )
}
