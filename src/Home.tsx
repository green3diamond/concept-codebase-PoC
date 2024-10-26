import { Link } from "react-router-dom"
import smallLogo from '/smallLogo.jpeg'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <>
            <div id="outsideRoot">
                <div id="logos">
                    <div className="flex items-center justify-center">
                        <img src={smallLogo} className="logo flex items-center" alt="Concept logo" />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <h2 className="text-lg font-bold text-slate-800">
                                Your furniture playground
                            </h2>
                            <p className="read-the-docs">
                                Development prototype features:
                            </p>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 justify-center">
                                    <div>
                                        <span className="font-medium text-slate-900">Drag to move</span>
                                        <p className="text-sm text-slate-600 mt-0.5">
                                            Freely position furniture pieces around the space
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 justify-center">
                                    <div>
                                        <span className="font-medium text-slate-900">Double-click to edit</span>
                                        <p className="text-sm text-slate-600 mt-0.5">
                                            Change the texture and rotate
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="p-4 flex justify-center">
                            <Link className="flex items-center justify-center" to="/appdemo">
                                <Button size="sm"
                                    className="rect-full"
                                    >
                                    Enter Playground
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}