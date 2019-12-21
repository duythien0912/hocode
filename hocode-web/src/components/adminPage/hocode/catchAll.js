/**
 * Generated catchAll.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React, { Component } from "react";
import { Redirect } from "react-router";

class catchAll extends Component {
  render() {
    return <Redirect push to="/" />;

    // return localStorage.getItem('token') ? (
    //     <NotFound />
    // ) : (
    //     <Redirect push to="/login" />
    // );
  }
}

export default catchAll;
/** End of Generated Code **/
