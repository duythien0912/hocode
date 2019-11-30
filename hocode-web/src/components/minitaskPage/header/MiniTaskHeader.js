import React, { Component } from "react";
import "./minitaskHeader.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../js/actions/authActions";
import { getUser } from "../../../js/actions/userAction";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import UserMenu from "./UserMenu";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
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
    console.log(this.props.history);
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
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt=""
              style={{ height: "40px" }}
            ></img>
          </Link>
        </div>
        <div className="minitaskName_mobi">{this.props.minitaskName}</div>{" "}
        {/*minitask name */}
        <div className="nav-wrapper">
          <div className="desktop-hide1">
            <div className="logo1">
              <Link to="/profile">
                <img
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  alt=""
                  style={{ height: "40px" }}
                ></img>
              </Link>
            </div>
          </div>
          <div
            className="left-menu"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              onClick={this.onBack}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              <KeyboardBackspaceIcon style={{ fontSize: 16 }} />
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
            <div
              className="code-point"
              style={{ fontSize: 14, margin: "0px 4px", color: "#4978cc" }}
            >
              Code point: {this.props.user.codepoint}
            </div>
            <div className="nav-name" style={{ fontSize: 14 }}>
              {this.props.user.firstname}
            </div>

            <div className="nav_usermenu ">
              <UserMenu />
            </div>
            <div className="desktop-hide">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <PersonIcon style={{ fontSize: 16 }} />
                <Link to="/profile"  style={{ fontSize: 14, marginLeft: "3px",textDecoration:"none",    fontFamily:' Nunito Sans, sans-serif' }} >Trang cá nhân</Link>
              </div>
            </div>
            <div className="desktop-hide">
              <div
                onClick={this.onBack}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <ExitToAppIcon style={{ fontSize: 16 }} />
                <p
                  style={{ fontSize: 14, marginLeft: "3px" }}
                  onClick={this.onLogout}
                >
                  Đăng xuất
                </p>
              </div>
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

export default connect(mapStateToProps, { logoutUser, getUser })(
  MiniTaskHeader
);
