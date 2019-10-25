import React, { Component } from "react";
import "./minitaskHeader.css";
import {  Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../js/actions/authActions";

class MiniTaskHeader extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
    const { history } = this.props;
    history.push("/login")
  };

  onBack = e =>{
    e.preventDefault();
    const { history } = this.props;
    history.goBack();
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
          <Link to="/">
          <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt=""
              style={{ height: "40px" }}
            ></img>
          </Link>
        </div>
        <div className="minitaskName_mobi">{this.props.minitaskName}</div> {/*minitask name */}
        <div className="nav-wrapper">
          <div className="left-menu" style={{display:'flex'}}>
            <a onClick={this.onBack} href="/dsa">Quay lại</a>
            <div className="miniTask_name" style={{display:'flex',justifyContent:'center',flexGrow:1}}>
              <div>Cộng 2 số</div>
            </div>
          </div>

          <div className="right-menu">
            <div className="code-point">{this.props.auth.user.data.codepoint}</div>
            <div className="nav-name">
              <div className="nameMenu">{this.props.auth.user.data.firstname}</div>
              <ul className="nameSubmenu">
                  <li><a href="giang" >Thông tin cá nhân</a></li>
                  <li><a href="giang"  onClick={this.onLogout}>Đăng xuất</a></li>
              </ul>
            </div>
            <div className="desktop-hide"> {/*hide when screen is destop */}
                <a href="/dsa"  onClick={this.onLogout}>Đăng xuất</a>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(MiniTaskHeader) ;

