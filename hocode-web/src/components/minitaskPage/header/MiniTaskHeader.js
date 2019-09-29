import React, { Component } from "react";
import "./minitaskHeader.css";
class MiniTaskHeader extends Component {
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
          <a href="/giang">
           sss
          </a>
        </div>
        <div className="nav-wrapper">
          <div className="left-menu" style={{display:'flex'}}>
            <a href="/dsa">Quay lại</a>
            <div style={{display:'flex',justifyContent:'center',flexGrow:1}}>
              <div>Cộng 2 số</div>
            </div>
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

export default MiniTaskHeader;
