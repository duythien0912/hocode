import React, { Component } from "react";
import Split from "react-split";

import "./minitask.css";
import MediaQuery from "react-responsive";
class MiniTaskPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="fit layout-code">
          {/* fit->  postion: absolute, top, bottom,left, right:0 ****   .layout-code{ display: flex;flex-direction: column;
        } */}
          <div className="layout-code-header">
          giang dep trai
          </div>

          <div className="layout-code-body">
            {/* layout-code-body->   position: relative;flex-grow: 1;*/}
            <div className="split-panel fit">
              <div className="stretch fit">
                <MediaQuery minDeviceWidth={701}>
                  <Split
                    className="splitHorizontal"
                    sizes={[25, 75]}
                    minSize={0}
                    expandToMin={false}
                    gutterSize={2}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="horizontal"
                    cursor="col-resize"
                  >
                    <div className="split-panel-first ">
                      nihil corporis beatae rem animi ratione? Numquam possimus
                      aliquam cumque deserunt, consectetur sequi temporibus.
                      Temporibus ex dolorum quibusdam sequi atque.
                    </div>
                    <div className="split-panel-second ">
                      <div className="coding-area">
                        <Split
                          className="splitVertical"
                          sizes={[75, 25]}
                          minSize={100}
                          expandToMin={false}
                          gutterSize={2}
                          gutterAlign="center"
                          snapOffset={30}
                          dragInterval={1}
                          direction="vertical"
                          cursor="row-resize"
                        >
                          <div className="codeEditor">editor</div>
                          <div className="testList">list test</div>
                        </Split>
                      </div>
                      <div
                        className="runtest-area"
                        style={{ height: "40px", minHeight: "40px" }}
                      >
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Nobis sed, nihil corporis beatae rem animi
                        ratione? Numquam possimus aliquam cumque deserunt,
                        consectetur sequi temporibus. Temporibus ex dolorum
                        quibusdam sequi atque
                      </div>
                    </div>
                  </Split>{" "}
                </MediaQuery>
                <MediaQuery maxDeviceWidth={700}>
                  {" "}
                  <div
                    style={{
                      top: "50%",
                      left: "50%",
                      position: "fixed",
                      transform: `translate(-50%,-50%)`,
                      textAlign: "center"
                    }}
                  >
                    Không hỗ trợ code bằng điện thoại
                  </div>
                </MediaQuery>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MiniTaskPage;
