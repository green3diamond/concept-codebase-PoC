import React from "react"
import IsMobileContext from "./IsMobileContext.tsx"

const INITIAL_STATE = {
  size: {
    width: window.innerWidth,
    height: window.innerHeight
  }
};

const withIsMobileViewProvider = Component => {
    class WithIsMobileViewProvider extends React.Component {
      constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
      }
  
      // add listener to handle window resizing
      componentDidMount() {
        window.addEventListener("resize", this.handleWindowSizeChange);
      }
  
      handleWindowSizeChange = () => {
        this.setState({
          size: { width: window.innerWidth, height: window.innerHeight }
        })
      }
  
      render() {
        // current logic to determine if isMobileView
        const isMobileView = this.state.size.width <= 600;
        return (
          <IsMobileContext.Provider value={isMobileView}>
            <Component {...this.props} />
          </IsMobileContext.Provider>
        );
      }
    }
    return WithIsMobileViewProvider;
  };
  
  // finally export the HOC
  export default withIsMobileViewProvider;