import React, { Component } from "react";
import "./minitaskHeader.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../js/actions/authActions";
import { getUser } from "../../../js/actions/userAction";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import UserMenu from "./UserMenu";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
class MiniTaskHeader extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    const { history } = this.props;
    history.push("/login");
  };

  onBack = e => {
    e.preventDefault();
    const { history } = this.props;
    history.goBack();
  };
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <nav className="minitask-header">
        <input type="checkbox" id="nav" className="hidden" />
        <label htmlFor="nav" className="nav-btn">
          <i />
          <i />
          <i />
        </label>
        <div className="logo">
          <Link to="/profile">
            <img
              src={process.env.PUBLIC_URL + "/logo.PNG"}
              alt=""
              style={{ height: "40px" }}
            ></img>
          </Link>
        </div>
        <div className="minitaskName_mobi">{this.props.minitaskName}</div>{" "}
        {/*minitask name */}
        <div className="nav-wrapper">
          <div
            className="left-menu"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div onClick={this.onBack} style={{ display: "flex", alignItems: "center", cursor:'pointer'}} >
            <KeyboardBackspaceIcon
              style={{ fontSize: 16 }}
            />
            <p style={{ fontSize: 14, marginLeft: "3px" }}>Back</p>
            </div>
            <div
              className="miniTask_name"
              style={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
            >
              <div>{this.props.minitaskName}</div>
            </div>
          </div>

          <div className="right-menu">
            
            <div className="code-point" style={{ fontSize: 14, margin: "0px 4px", color: "#4978cc" }}>
              <EmojiNatureIcon style={{ fontSize: 16, marginRight: 1 }} />
              {this.props.user.codepoint}
            </div>
            <div className="nav-name" style={{ fontSize: 14 }}>{this.props.user.firstname}</div>
            <div className="nav_usermenu"><UserMenu/></div>
           
            <div className="desktop-hide">
              {" "}
              {/*hide when screen is destop */}
              <a href="/dsa" onClick={this.onLogout}  style={{ fontSize: 12 }}>
                Đăng xuất
              </a>
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
  { logoutUser, getUser }
)(MiniTaskHeader);
