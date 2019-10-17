import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
//import axios from 'axios';
import Select from "react-select";
import ReactMde from "../../minitaskPage/ReactMde";
import CodeEditor from "./CodeEditor";
import "./createminitaskbody.css";

const options = [
  { value: "int", label: "Interger" },
  { value: "String", label: "String" },
  { value: "double", label: "Double" }
];
const styles = {
  CreateMiniTaskBodyContainer: {
    paddingTop: "50px",
    minHeight: "100vh"
  },
  CreateMiniTaskLeftBodyContainer: {
    padding: 10,
    paddingLeft: 30
  }
};

// custom react select style
const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
class CreateMiniTaskBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      name_func: "",
      output_type_func: "int",
      point_unlock: 0,
      status: "yeucaumokhoa",
      vitri: false,
      mini_task_desc: "",
      level: "hard",
      user_code: "",
      /*unit_tests: [
        {
          inputs: [{ value: 2, type: "int" }, { value: 1, type: "int" }],
          expected_output: "3"
        },
        {
          inputs: [{ value: 2, type: "int" }, { value: 1, type: "int" }],
          expected_output: "3"
        }
      ],*/
      unit_tests: [],
      taskId: "",
      //inputList:[{input_name:"param1",input_type:"int"}]
      inputList: []
    };
    this.output_type_func = React.createRef();

    this.handleSimpleInputChange = this.handleSimpleInputChange.bind(this);

    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTemplateCode = this.updateTemplateCode.bind(this);
  }
  componentDidMount() {}
  // handle simple input change
  handleSimpleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    /*  this.setState({
            minitask:{...minitask,[name]:value}
        });*/
    this.setState((state, props) => ({
      [name]: value
    }));
  }
  // handle minitask desc change
  handleMarkdownChange(value) {
    this.setState({
      mini_task_desc: value
    });
  }

  // create a new minitask
  handleSubmit() {
    const template_code = `public ${this.state.output_type_func} ${
      this.state.name_func
    }(${this.state.inputList
      .map(input => {
        return `${input.input_type} ${input.input_name}`;
      })
      .join()}){ 
  
    }`;
    console.log(this.state);
    console.log(template_code);
  }

  // handle ouput_type_function select change
  onSelectChange(select_value) {
    const name = this.output_type_func.current.props.name; //get name of select tag
    this.setState({
      [name]: select_value.value
    });
  }
  // update template code when typing
  updateTemplateCode(value) {
    this.setState({
      template_code: value
    });
  }

  //add input to list input
  addInput() {
    this.setState({
      inputList: [
        ...this.state.inputList,
        { input_name: "", input_type: "int" }
      ]
    });
  }

  // handle list input change
  handleListInputNameChange(e, index) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.inputList[index].input_name = e.target.value;
    this.setState({ inputList: this.state.inputList });
  }

  //handle list input type change
  handleListInputTypeChange(select_value, index) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.inputList[index].input_type = select_value.value;
    this.setState({ inputList: this.state.inputList });
  }

  addTest() {
    ///xem lại cái type của input có cần hông
    const inputListLength = this.state.inputList.length;

    let arrayInput = [];
    for (let i = 0; i < inputListLength; i++) {
      arrayInput.push({ value: "", type: "int" });
    }
    this.setState({
      unit_tests: [
        ...this.state.unit_tests,
        { inputs: arrayInput, expected_output: " " }
      ]
    });
  }

  handleOutputTestChange(e, index0) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.unit_tests[index0].expected_output = e.target.value;
    this.setState({ unit_tests: this.state.unit_tests });
  }
  handleInputTestChange(e, index0, index1) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.unit_tests[index0].inputs[index1].value = e.target.value;
    this.setState({ unit_tests: this.state.unit_tests });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>Tạo bài tập</div>
        </div>
        <Grid container className={classes.CreateMiniTaskBodyContainer}>
          <Grid item xs={12} sm={6} md={6}>
            <div className={classes.CreateMiniTaskLeftBodyContainer}>
              <div>Tên bài tập:</div>
              <input
                name="name"
                className="input-createminitask"
                onChange={this.handleSimpleInputChange}
              />
              <div>function name:</div>
              <input
                name="name_func"
                className="input-createminitask"
                onChange={this.handleSimpleInputChange}
              />
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                Kiểu trả về:
              </div>
              <Select
                className="select_type"
                styles={selectStyles}
                options={options}
                ref={this.output_type_func}
                name="output_type_func"
                defaultValue={options[0]}
                onChange={this.onSelectChange}
              />
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                Mô tả bài toán:
              </div>
              <ReactMde
                handleMarkdownChange={this.handleMarkdownChange}
                mini_task_desc={this.state.mini_task_desc}
              />
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button onClick={e => this.addInput(e)}>Thêm tham số</button>
                </div>
                <div
                  style={{
                    maxHeight: "30vh",
                    position: "relative",
                    overflowY: "scroll",
                    overflowX: "hidden"
                  }}
                >
                  {this.state.inputList.map((input, index) => {
                    return (
                      <div key={index}>
                        <div style={{ display: "flex" }}>
                          <div style={{ display: "flex" }}>
                            <div style={{ marginBottom: 10, marginTop: 10 }}>
                              Tên tham số:
                            </div>
                            <div>
                              <input
                                className="input-createminitask"
                                value={input.input_name}
                                onChange={e =>
                                  this.handleListInputNameChange(e, index)
                                } // higher order function, index và e là biến vẫn được sử dụng sau khi onchange thự thi
                              />{" "}
                            </div>
                          </div>
                          <div style={{ display: "flex", flexGrow:1 }} >
                            <div style={{ marginBottom: 10, marginTop: 10 }}>
                              kiểu tham số:
                            </div>
                            <div style={{ width:'50%' }} >
                              <Select
                                
                                options={options}
                                defaultValue={options[0]}
                                onChange={select_value =>
                                  this.handleListInputTypeChange(
                                    select_value,
                                    index
                                  )
                                } // higher order function
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}{" "}
                </div>
              </div>

              <button onClick={this.handleSubmit}>submit</button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="codeEditorCreateMiniTask">
              <CodeEditor
                output_type_func={this.state.output_type_func}
                name_func={this.state.name_func}
                inputList={this.state.inputList}
                updateTemplateCode={this.updateTemplateCode}
              />
            </div>
            {this.state.unit_tests.map((unit_test, index0) => {
              return (
                <div key={index0}>
                  {" "}
                  test {index0 + 1}
                  <div>Inputs:</div>
                  {unit_test.inputs.map((input, index1) => {
                    return (
                      <input
                        className="input-createminitask"
                        key={index1}
                        value={input.value}
                        onChange={e =>
                          this.handleInputTestChange(e, index0, index1)
                        }
                      />
                    );
                  })}
                  <div>Out put</div>
                  <input
                    value={unit_test.expected_output}
                    onChange={e => this.handleOutputTestChange(e, index0)}
                  />
                </div>
              );
            })}
            <button onClick={e => this.addTest(e)}>Thêm test</button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CreateMiniTaskBody);
