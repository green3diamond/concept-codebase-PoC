import { Link } from "react-router-dom"
import conceptLogo from '/smallLogo.jpeg'

export default function Home() {
    return (
        <>
            <div id="outsideRoot">
                <div id="logos">
                    <div>
                        <Link to="/appdemo">
                            <img src={conceptLogo} className="logo" alt="Concept logo" />
                        </Link>
                    </div>
                    <h1>demo</h1>
                    <p className="read-the-docs">
                        Click on the Concept logo to explore
                    </p>
                </div>
            </div>
        </>
    )
}