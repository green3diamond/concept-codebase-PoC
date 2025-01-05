import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"
import Home from './Home.tsx'
import Experience from './Experience.tsx'
import { Canvas } from '@react-three/fiber'
import { Analytics } from "@vercel/analytics/react"
import AdaptiveNavbar from "./components/AdaptiveNavbar.tsx"
import withIsMobileViewProvider from "./context/withIsMobileVIewProvider.tsx";


/**
 * The main application component.
 * @returns {JSX.Element} - The JSX element representing the application.
 */
function App() {

    return (
        <>
            {/* This is the alias of BrowserRouter i.e. Router */}
            <Analytics />
            <Router>
                <Routes>
                    {/* This route is for home component with exact path "/", in component props we passes the imported component*/}
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/appdemo"
                        element={
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
                        }
                    />
                </Routes>
            </Router>
        </>
    )
}

export default withIsMobileViewProvider(App)
