import React from "react"
import IsMobileContext from "./IsMobileContext.tsx"

const withIsMobileView = Component => {
    class withIsMobileView extends React.Component {
      render() {
        return (
          <IsMobileContext.Consumer>
            {isMobileView => {
              return <Component {...this.props} isMobileView={isMobileView} />;
            }}
          </IsMobileContext.Consumer>
        );
      }
    }
    return withIsMobileView;
  };
  
  // finally export the HOC
  export default withIsMobileView;