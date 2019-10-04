import React, { Component } from "react";
import Split from "react-split";
import MiniTaskDesc from "./body/MiniTaskDesc";
import MiniTaskHeader from "./header/MiniTaskHeader";
import CodeEditor from "./body/CodeEditor";
import ResultPanel from "./body/ResultPanel";
import "./minitask.css";
import MediaQuery from "react-responsive";
import axios from 'axios';
class MiniTaskPage extends Component {
  constructor(props){
    super(props);
    this.state={
      minitask: {},
      result:{
        passedQuantity: 1,
        testQuantity:2,
        tests:[{inputs:["1","2"],output:"3",expected_output:"3",testStatus:"pass"},{inputs:["2","2"],output:"2",expected_output:"4",testStatus:"fail"}],
      }
    }
  }
  componentDidMount(){
    const { match: { params } } = this.props;
    axios.get(`/minitasks/${params.minitaskId}`)
    .then(res => { 
      const minitask = res.data;
      this.setState({minitask});
    })

   // setTimeout(()=>{console.log(this.state.minitask.minitask_desc)},2000)
  }
  render() {
    const {minitask}=this.state;
    return (
      <React.Fragment>
        <div className="fit layout-code">
          {/* fit->  postion: absolute, top, bottom,left, right:0 ****   .layout-code{ display: flex;flex-direction: column;
        } */}
          <div className="layout-code-header">
            <MiniTaskHeader minitaskName={minitask.name} />
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
                    gutterSize={4}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="horizontal"
                    cursor="col-resize"
                  >
                    <div className="split-panel-first ">
                      <MiniTaskDesc minitask_desc={minitask.minitask_desc} />
                    </div>
                    <div className="split-panel-second ">
                      <div className="coding-area">
                        <Split
                          className="splitVertical"
                          sizes={[75, 25]}
                          minSize={100}
                          expandToMin={false}
                          gutterSize={4}
                          gutterAlign="center"
                          snapOffset={30}
                          dragInterval={1}
                          direction="vertical"
                          cursor="row-resize"
                        >
                          <div className="codeEditor">
                            <CodeEditor />
                            <div
                              className="reset_code"
                              style={{
                                position: "absolute",
                                bottom: 10,
                                right: 20,
                                zIndex: 9,
                               
                              }}
                            >
                              <button style={{ fontSize:10, padding:"6px 8px"}}>Reset code</button>
                            </div>
                          </div>
                          <div className="testList">
                            <ResultPanel unit_tests={minitask.unit_tests} result={this.state.result}/>
                          </div>
                        </Split>
                      </div>
                      <div
                        className="runtest-area"
                        style={{
                          minHeight: "40px",
                          padding: "10px 20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}
                      >
                        <div style={{marginLeft:20, color:'#4DBF9D'}}>300/300</div>
                        <div style={{marginLeft:30}}>
                          <button className="execute_btn" style={{display:'flex',alignItems:'center'}}>
                            Thực thi{" "}
                            <img
                              src={require('./play-button.svg')}
                              alt=""
                              style={{ height: "10px",marginLeft:'3px' }}
                            ></img>
                          </button>
                        </div>
                        <div style={{marginLeft:10}}>
                          <button className="submitCode_btn">
                            Nộp bài{" "}
                          </button>
                        </div>
                        <div style={{marginLeft:30,fontSize:12}}><a href="/dsa" style={{textDecoration:'none',color:'#595959'}}>Qua bài mới</a></div>
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
