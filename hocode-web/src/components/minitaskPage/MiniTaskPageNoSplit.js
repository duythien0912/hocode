import React, { Component } from "react";
import MiniTaskDesc from "./body/MiniTaskDesc";
import MiniTaskHeader from "./header/MiniTaskHeader";
import CodeEditor from "./body/CodeEditor";
import ResultPanel from "./body/ResultPanel";
import TestsPanel from "./body/TestsPanel";
import "./minitasknosplit.css";
//import MediaQuery from "react-responsive";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";

import { connect } from "react-redux";
import {
  submitUpdateMinitask,
  setUndefinedNextMinitask
} from "../../js/actions/userAction";
import Grid from "@material-ui/core/Grid";

class MiniTaskPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minitask: {},
      result: {},
      userCode: "",
      isLoading: false,
      isLoadingComponent: true
    };

    this.executeCode = this.executeCode.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.updateUserCode = this.updateUserCode.bind(this);
    this.resetCode = this.resetCode.bind(this);
    this.createFileTest = this.createFileTest.bind(this);
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(`https://hocodevn.com/api/v1/minitasks/${params.minitaskId}`)
      .then(res => {
        const minitask = res.data;

        this.setState((state, props) => ({
          minitask: minitask,
          isLoadingComponent: false
        }));
        // setTimeout(() => {
        //   console.log(this.state.minitask);
        // }, 0);
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
  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.minitaskId !== this.props.match.params.minitaskId
    ) {
      this.props.setUndefinedNextMinitask();
      console.log("next ");
      this.setState((state, props) => ({
        result: {}
      }));
      axios
        .get(
          `https://hocodevn.com/api/v1/minitasks/${this.props.match.params.minitaskId}`
        )
        .then(res => {
          const minitask = res.data;

          this.setState((state, props) => ({
            minitask: minitask
          }));

          this.setState((state, props) => ({
            userCode: minitask.template_code
          }));
        });
      // do something
    }
  }
  updateUserCode(value) {
    // is props of <codeEditor/> to update usercode wwhen edit in editor
    this.setState({ userCode: value });
  }

  resetCode() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success comfirmFesetCodeBtn",
        cancelButton: "btn btn-danger cancelCodeBtn"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: "Bạn có chắc chắn muốn xóa code đã lưu?",
        text: "Bạn sẽ không thể hoàn tác!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.setState((state, props) => ({
            userCode: minitask.template_code
          }));
          swalWithBootstrapButtons.fire("Đã reset!", "", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire("Đã hủy", "", "error");
        }
      });
    const { minitask } = this.state;
  }

  createFileTest(minitask) {
    let junit4 = ``;

    if (minitask.id !== undefined) {
      if (minitask.output_type_func.includes("[]") === true) {
        junit4 = `import static org.junit.Assert.assertArrayEquals;\n    import org.junit.Test;\n    import org.junit.runners.JUnit4;\n    public class TestFixture {\n    public TestFixture(){}\n `;
        minitask.unit_tests.forEach((unit_test, index) => {
          let inputs = "";
          unit_test.inputs.forEach(input => {
            if (input.type.includes("[]") === true) {
              // if input is array, add new input.type before input.value // new int[] {1,2,3,4}
              inputs += `new ${input.type} ${input.value},`;
            } else {
              inputs += `${input.value},`;
            }
          });
          let inputsFormat = inputs.substring(0, inputs.length - 1);

          if (minitask.output_type_func === "double[]") {
            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertArrayEquals("test ${index +
              1}", ${unit_test.expected_output}, s.${
              minitask.name_func
            }(${inputsFormat}),0);\n  }\n`;
          }
          else{

            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertArrayEquals("test ${index +
              1}", new ${minitask.output_type_func} ${
              unit_test.expected_output
            }, s.${minitask.name_func}(${inputsFormat}));\n  }\n`;
          }

          
        
        });
        junit4 += `}`;
      } else {
        junit4 = `import static org.junit.Assert.assertEquals;\n    import org.junit.Test;\n    import org.junit.runners.JUnit4;\n    public class TestFixture {\n    public TestFixture(){}\n `;
        minitask.unit_tests.forEach((unit_test, index) => {
          let inputs = "";
          unit_test.inputs.forEach(input => {
            if (input.type.includes("[]") === true) {
              // if input is array, add new input.type before input.value // new int[] {1,2,3,4}
              inputs += `new ${input.type} ${input.value},`;
            } else {
              inputs += `${input.value},`;
            }
          });
          let inputsFormat = inputs.substring(0, inputs.length - 1);
          if (minitask.output_type_func === "double") {
            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertEquals("test ${index +
              1}", ${unit_test.expected_output}, s.${
              minitask.name_func
            }(${inputsFormat}),0);\n  }\n`;
          }
          else if(minitask.output_type_func === "String"){
            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertEquals("test ${index +
              1}", "${unit_test.expected_output}", s.${
              minitask.name_func
            }(${inputsFormat}));\n  }\n`;
          }
           else {
            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertEquals("test ${index +
              1}", ${unit_test.expected_output}, s.${
              minitask.name_func
            }(${inputsFormat}));\n  }\n`;
          }
        });
        junit4 += `}`;
      }
    }
    return junit4;
  }

  executeCode() {
    this.setState((state, props) => ({
      result: {}
    }));
    const { minitask } = this.state;
    //console.log(this.state.userCode);
    let junit4 = this.createFileTest(minitask);

    let code = `public class Solution {\n    public Solution(){}\n    ${this.state.userCode}\n    }`;
    this.setState((state, props) => ({
      isLoading: true
    }));

    console.log(junit4);
    //console.log(code);
    axios
      .post("https://hocodevn.com/api/runner/java", {
        code: code,
        test: junit4
      })
      .then(
        function(response) {
          console.log(response);
          const error = response.data.stderr;
          const stdout = response.data.stdout;

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
      .catch(
        function(error) {
          this.setState((state, props) => ({
            isLoading: false,
            result: {
              errorRuntime: error
            }
          }));
          console.log(error);
        }.bind(this)
      );
  }
  submitCode() {
    this.setState((state, props) => ({
      result: {}
    }));
    const { minitask } = this.state;
    //console.log(this.state.userCode);
    let junit4 = this.createFileTest(minitask);

    let code = `public class Solution {\n    public Solution(){}\n    ${this.state.userCode}\n    }`;
    this.setState((state, props) => ({
      isLoading: true
    }));

    axios
      .post("https://hocodevn.com/api/runner/java", {
        code: code,
        test: junit4
      })
      .then(
        function(response) {
          console.log(response);
          const error = response.data.stderr;
          const stdout = response.data.stdout;

          this.setState((state, props) => ({
            result: {
              error: error,
              stdout: stdout
            }
          }));
          this.setState((state, props) => ({
            isLoading: false
          }));

          if (this.state.result.stdout.WASSUCCESSFUL === "true") {
            // process alert success and add code point
            this.props.submitUpdateMinitask(
              this.state.minitask.id,
              this.state.minitask.task_id
            );

            Swal.fire({
              type: "success",
              title: `Chúc mừng, bạn đã hoàn thành bài tập này`,
              width: 600,
              padding: "3em",
              customClass: "hidden_alert",
              backdrop: `
                rgba(0,0,123,0.4)
                url("${require("./giphy.gif")}") 
                center center
                no-repeat
              `
            });
            toast("Chúc mừng, bạn đã hoàn thành bài tập này!", {
              containerId: "B"
            });
          }
        }.bind(this)
      )
      .catch(
        function(error) {
          this.setState((state, props) => ({
            isLoading: false,
            result: {
              errorRuntime: error
            }
          }));
          console.log(error);
        }.bind(this)
      );
  }
  render() {
    const { minitask, result } = this.state;
    const { isLoadingComponent } = this.state;
    function renderPassedTestCount() {
      if (result !== undefined) {
        if (result.stdout !== undefined) {
          if (result.stdout.WASSUCCESSFUL !== undefined) {
            return (
              <React.Fragment>
                {result.stdout.RUNCOUNT - result.stdout.GETFAILURECOUNT}/
                {result.stdout.RUNCOUNT}
              </React.Fragment>
            );
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div className="fit layout-code">
          {/* fit->  postion: absolute, top, bottom,left, right:0 ****   .layout-code{ display: flex;flex-direction: column;
        } */}
          <div className="layout-code-header">
            <MiniTaskHeader
              minitaskName={minitask.mini_task_name}
              history={this.props.history}
            />
          </div>
          {isLoadingComponent ? (
            <div
              className="sweet-loading"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height:'100vh'
              }}
            >
              <HashLoader
                sizeUnit={"px"}
                size={50}
                color={"#AEA8A8"}
                loading={isLoadingComponent}
              />
            </div>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <MiniTaskDesc
                  mini_task_desc={minitask.mini_task_desc}
                  code_point={minitask.code_point}
                  level={minitask.level}
                />
              </Grid>
              <Grid
                item
                container
                style={{ flexDirection: "column" }}
                xs={12}
                sm={8}
                md={8}
              >
                <Grid item style={{ flexGrow: 1 }}>
                  <div className="coding-area">
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
                          style={{
                            fontSize: 10,
                            padding: "6px 8px",
                            cursor: "pointer"
                          }}
                        >
                          Reset code
                        </button>
                      </div>
                    </div>

                    <div className="resultPanel">
                      {this.state.result.stdout !== undefined ||
                      this.state.result.errorRuntime !== undefined ? (
                        <ResultPanel
                          unit_tests={minitask.unit_tests} // truyền unit test vô chỉ là tạm thời, chứ unitest này phải lấy từ result
                          result={this.state.result}
                        />
                      ) : (
                        <TestsPanel
                          isLoading={this.state.isLoading}
                          unit_tests={minitask.unit_tests}
                        />
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item>
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
                      {renderPassedTestCount()}
                    </div>
                    <div style={{ marginLeft: 30 }}>
                      <button
                        className={`execute_btn ${this.state.isLoading &&
                          "disable_btn"}`}
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={this.executeCode}
                        disabled={this.state.isLoading}
                      >
                        {this.state.isLoading ? "Đang thực thi" : "Thực thi"}
                        <img
                          src={require("./play-button.svg")}
                          alt=""
                          style={{ height: "10px", marginLeft: "3px" }}
                        ></img>
                      </button>
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <button
                        onClick={this.submitCode}
                        className={`submitCode_btn ${this.state.isLoading &&
                          "disable_btn"}`}
                        disabled={this.state.isLoading}
                      >
                        Nộp bài
                      </button>
                    </div>

                    {this.props.user.next_minitask !== undefined ? (
                      <div style={{ marginLeft: 30, fontSize: 12 }}>
                        <Link
                          to={`/tasks/${this.props.user.next_minitask.id}`}
                          style={{
                            textDecoration: "none",
                            color: "#595959"
                          }}
                        >
                          Qua bài mới
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          )}

          <ToastContainer
            enableMultiContainer
            containerId={"B"}
            position={toast.POSITION.TOP_RIGHT}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default connect(mapStateToProps, {
  submitUpdateMinitask,
  setUndefinedNextMinitask
})(MiniTaskPage);
