import { Link } from "react-router-dom"
import conceptLogo from '/smallLogo.jpeg'

export default function Home() {
    return (
        <>
            <div id="outsideRoot">
                <div id="logos">
                    <div >
                        <Link className="flex items-center justify-center" to="/appdemo">
                            <img src={conceptLogo} className="logo flex items-center" alt="Concept logo" />
                        </Link>
                    </div>
                    {/* <h1>demo</h1> */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200">
                        <h2 className="text-lg font-bold text-slate-800">
                        Interactive Features
                        </h2>
                        <p className="read-the-docs">
                            (Click on the Concept logo to explore)
                        </p>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-3">
                        <li className="flex items-start gap-3 justify-center">
                            <div>
                            <span className="font-medium text-slate-900">Drag & Move</span>
                            <p className="text-sm text-slate-600 mt-0.5">
                                Freely position furniture pieces around the space
                            </p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 justify-center">
                            <div>
                            <span className="font-medium text-slate-900">Access Options</span>
                            <p className="text-sm text-slate-600 mt-0.5">
                                Double click any piece to view and modify its settings
                            </p>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}