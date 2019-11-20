import React, { Component } from "react";
import MediaQuery from "react-responsive";
import MiniTaskPage from "./MiniTaskPage";
import MiniTaskPageNoSplit from "./MiniTaskPageNoSplit";

class MinitaskPageResponsive extends Component {

  render() {
    const {
        match
      } = this.props;
    return (
      <React.Fragment>
        <MediaQuery minDeviceWidth={701}>
          <MiniTaskPage match={match} history={this.props.history} />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={700}>
          <MiniTaskPageNoSplit match={match} history={this.props.history} />
        </MediaQuery>
      </React.Fragment>
    );
  }
}

export default MinitaskPageResponsive;
