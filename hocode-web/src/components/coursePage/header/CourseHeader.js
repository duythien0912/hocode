import React, { Component } from "react";
import "./courseHeader.css";
class CourseHeader extends Component {
  render() {
    return (
      <nav className="course-header">
        <input type="checkbox" id="nav" className="hidden" />
        <label htmlFor="nav" className="nav-btn">
          <i />
          <i />
          <i />
        </label>
        <div className="logo">
          <a href="/giang">
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
            <div className="code-point">2000</div>
            <div className="nav-name">
              <div className="nameMenu">giang</div>
              <ul className="nameSubmenu">
                  <li><a href="giang">Thông tin cá nhân</a></li>
                  <li><a href="giang">Đăng xuất</a></li>
              </ul>
            </div>
            <div className="desktop-hide"> {/*hide when screen is destop */}
                <a href="/dsa">Đăng xuất</a>
                </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default CourseHeader;
