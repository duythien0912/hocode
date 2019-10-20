import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true && auth.user.name === 'giang' ? ( // xet cho chô nay quyen voi username == giang moi dc cho vao router nay , phai xem lai may cai history.push o may trang login, register de nó khong dua toi trang lung tung
        <Component {...props} />
      ) : (
        <div>ban khong du quyen truy cap vao trang nay</div>
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);