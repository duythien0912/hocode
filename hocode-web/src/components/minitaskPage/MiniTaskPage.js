import React, { Component } from "react";
import Split from "react-split";
import MiniTaskDesc from "./body/MiniTaskDesc";
import MiniTaskHeader from "./header/MiniTaskHeader";
import CodeEditor from "./body/CodeEditor";
import ResultPanel from "./body/ResultPanel";
import TestsPanel from "./body/TestsPanel";
import "./minitask.css";
import MediaQuery from "react-responsive";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

class MiniTaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minitask: {},
      result: {},
      userCode: "",
      isLoading: false
    };
    
    this.executeCode = this.executeCode.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.updateUserCode = this.updateUserCode.bind(this);
    this.resetCode= this.resetCode.bind(this);
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`https://hocode.appspot.com/api/v1/minitasks/${params.minitaskId}`)
      .then(res => {
        const minitask = res.data;

        this.setState((state, props) => ({
          minitask: minitask
        }));
        /* if(minitask.user_code !== ''){ // if user have ever code in this minitassk, load user code
        this.setState((state, props) => ({
          userCode: minitask.user_code
        }));
      }
      else{ 
        this.setState((state, props) => ({
          userCode: minitask.template_code
        }));
      } */
        this.setState((state, props) => ({
          userCode: minitask.template_code
        }));
      });

    // setTimeout(()=>{console.log(this.state.minitask.mini_task_desc)},2000)
  }
  updateUserCode(value) {
    // is props of <codeEditor/> to update usercode wwhen edit in editor
    this.setState({ userCode: value });
  }

  resetCode(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc chắn muốn xóa code đã lưu?',
      text: "Bạn sẽ không thể hoàn tác!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {
        this.setState((state, props) => ({
          userCode: minitask.template_code
        }));
        swalWithBootstrapButtons.fire(
          'Đã reset!',
          '',
          'success'
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          '',
          'error'
        )
      }
    })
    const { minitask } = this.state;
   
  }

  executeCode() {
    const { minitask } = this.state;
    //console.log(this.state.userCode);
    let junit4 = `import static org.junit.Assert.assertEquals;\n    import org.junit.Test;\n    import org.junit.runners.JUnit4;\n    public class TestFixture {\n    public TestFixture(){}\n    @Test\n    public void myTestFunction(){\n    Solution s = new Solution();\n `;

    let code = `public class Solution {\n    public Solution(){}\n    ${this.state.userCode}\n    }`;
    this.setState((state, props) => ({
      isLoading: true
    }));

    if (this.state.minitask.id !== undefined) {
      minitask.unit_tests.forEach((unit_test, index) => {
        let inputs = "";
        unit_test.inputs.forEach(input => {
          inputs += `${input.value},`;
        });
        let inputsFormat = inputs.substring(0, inputs.length - 1);
        junit4 += ` assertEquals("test ${index + 1}", ${
          unit_test.expected_output
        }, s.${this.state.minitask.name_func}(${inputsFormat}));\n`;
      });
      junit4 += ` }}`;
    }
    console.log(junit4);
    console.log(code);
    axios
      .post("https://hocodevn.com/runner", {
        code: code,
        test: junit4
      })
      .then(
        function(response) {
          const error = response.data.stderr.replace(/<:LF:>/gm, "\n");
          const stdout = response.data.stdout.replace(/<:LF:>/gm, "\n");

          this.setState((state, props) => ({
            result: {
              error: error,
              stdout: stdout
            }
          }));
          this.setState((state, props) => ({
            isLoading: false
          }));
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }
  submitCode(){
    const { minitask } = this.state;
    //console.log(this.state.userCode);
    let junit4 = `import static org.junit.Assert.assertEquals;\n    import org.junit.Test;\n    import org.junit.runners.JUnit4;\n    public class TestFixture {\n    public TestFixture(){}\n    @Test\n    public void myTestFunction(){\n    Solution s = new Solution();\n `;

    let code = `public class Solution {\n    public Solution(){}\n    ${this.state.userCode}\n    }`;
    this.setState((state, props) => ({
      isLoading: true
    }));

    if (this.state.minitask.id !== undefined) {
      minitask.unit_tests.forEach((unit_test, index) => {
        let inputs = "";
        unit_test.inputs.forEach(input => {
          inputs += `${input.value},`;
        });
        let inputsFormat = inputs.substring(0, inputs.length - 1);
        junit4 += ` assertEquals("test ${index + 1}", ${
          unit_test.expected_output
        }, s.${this.state.minitask.name_func}(${inputsFormat}));\n`;
      });
      junit4 += ` }}`;
    }
    console.log(junit4);
    console.log(code);
    axios
      .post("https://hocodevn.com/runner", {
        code: code,
        test: junit4
      })
      .then(
        function(response) {
          const error = response.data.stderr.replace(/<:LF:>/gm, "\n");
          const stdout = response.data.stdout.replace(/<:LF:>/gm, "\n");

          this.setState((state, props) => ({
            result: {
              error: error,
              stdout: stdout
            }
          }));
          this.setState((state, props) => ({
            isLoading: false
          }));
          const result = true;  // dữ liệu giả
          if(result === true){ // process alert success and add code point
            Swal.fire({
              
              type:'success',
            title: `Chúc mừng, bạn đã hoàn thành bài tập này`,
              width: 600,
              padding: '3em',
              backdrop: `
                rgba(0,0,123,0.4)
                url("${require('./giphy.gif')}") 
                center left
                no-repeat
              `
            })
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });

    
  }
  render() {
    const { minitask } = this.state;
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
                      <MiniTaskDesc mini_task_desc={minitask.mini_task_desc} />
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
                            <CodeEditor
                              userCode={this.state.userCode}
                              updateUserCode={this.updateUserCode}
                            />
                            <div
                              className="reset_code"
                              style={{
                                position: "absolute",
                                bottom: 10,
                                right: 20,
                                zIndex: 9
                              }}
                            >
                              <button
                                onClick={this.resetCode}
                                style={{ fontSize: 10, padding: "6px 8px" }}
                              >
                                Reset code
                              </button>
                            </div>
                          </div>
                          <div className="resultPanel">
                            {this.state.result.stdout !== undefined ? (
                              <ResultPanel
                                unit_tests={minitask.unit_tests} // truyền unit test vô chỉ là tạm thời, chứ unitest này phải lấy từ result
                                result={this.state.result}
                              />
                            ) : (
                              <TestsPanel unit_tests={minitask.unit_tests} />
                            )}
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
                        <div style={{ marginLeft: 20, color: "#4DBF9D" }}>
                          300/300
                        </div>
                        <div style={{ marginLeft: 30 }}>
                          <button
                            className={`execute_btn ${this.state.isLoading &&
                              "disable_btn"}`}
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={this.executeCode}
                            disabled={this.state.isLoading}
                          >
                            Thực thi{" "}
                            <img
                              src={require("./play-button.svg")}
                              alt=""
                              style={{ height: "10px", marginLeft: "3px" }}
                            ></img>
                          </button>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                          <button
                            onClick ={this.submitCode}
                            className={`submitCode_btn ${this.state.isLoading &&
                              "disable_btn"}`}
                            disabled={this.state.isLoading}
                          >
                            Nộp bài
                          </button>
                        </div>
                        {this.state.result.isPass ?(   <div style={{ marginLeft: 30, fontSize: 12 }}>
                          <Link
                            to={`https://hocode.appspot.com/api/v1/minitasks/${this.state.next_minitask_id}`}
                            style={{ textDecoration: "none", color: "#595959" }}
                            
                          >
                            Qua bài mới
                          </Link>
                        </div>):<div></div>}
                     
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
