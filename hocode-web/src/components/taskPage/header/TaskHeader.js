import React, { Component } from "react";
import "./taskHeader.css";
import { connect } from "react-redux";
import { logoutUser } from "../../../js/actions/authActions";
import { getUser } from "../../../js/actions/userAction";
class TaskHeader extends Component {
  componentDidMount(){
    this.props.getUser();
    
  }
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    const { history } = this.props;
    history.push("/login")
  };

  render() {
    return (
      <nav className="task-header">
        <input type="checkbox" id="nav" className="hidden" />
        <label htmlFor="nav" className="nav-btn">
          <i />
          <i />
          <i />
        </label>
        <div className="logo">
          <a href="/">
            <img
              src={require("./logo.png")}
              alt=""
              style={{ height: "40px" }}
            ></img>
          </a>
        </div>
        <div className="nav-wrapper">
          <div className="left-menu">
            <a href="/dsa">Thông tin cá nhân</a>
          </div>

          <div className="right-menu">
            <div className="code-point">{this.props.user.codepoint}</div>
            <div className="nav-name">
              <div className="nameMenu">{this.props.user.firstname}</div>
              <ul className="nameSubmenu">
                  <li><a href="giang">Thông tin cá nhân</a></li>
                  <li><a href="giang" onClick={this.onLogout}>Đăng xuất</a></li>
              </ul>
            </div>
            <div className="desktop-hide"> {/*hide when screen is destop */}
                <a href="/dsa" onClick={this.onLogout}>Đăng xuất</a>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default connect(
  mapStateToProps,
  { logoutUser,getUser }
)(TaskHeader) ;


