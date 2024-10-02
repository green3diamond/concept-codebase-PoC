import React from "react"
import MobileNavbar from "./mobile/Navbar.tsx"
import DesktopNavbar from "./desktop/Navbar.tsx"
import withIsMobileView from "../context/withIsMobileView.tsx"

class AdaptiveNavbar extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.isMobileView ? (
                        <MobileNavbar />
                    ) : (
                        <DesktopNavbar />
                    )
                }
            </>
        )
    }
}

export default withIsMobileView(AdaptiveNavbar);