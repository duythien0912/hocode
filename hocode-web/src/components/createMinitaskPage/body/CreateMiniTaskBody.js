import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
//import axios from 'axios';
import Select from "react-select";
import ReactMde from "../../minitaskPage/ReactMde";
import CodeEditor from "./CodeEditor";
const options = [
  { value: "int", label: "Interger" },
  { value: "String", label: "String" },
  { value: "double", label: "Double" }
];
const styles = {
  CreateMiniTaskBodyContainer: {
    paddingTop: "20px",
    minHeight: "100vh"
  }
};
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
      template_code: "",
      user_code: "",
      unit_tests: [
        {
          inputs: [{ value: 2, type: "int" }, { value: 1, type: "int" }],
          expected_output: "3"
        },
        {
          inputs: [{ value: 2, type: "int" }, { value: 1, type: "int" }],
          expected_output: "3"
        }
      ],
      taskId: "",
      //inputList:[{input_name:"param1",input_type:"int"}]
      inputList: []
    };
    this.output_type_func = React.createRef();

    this.handleSingleInputChange = this.handleSingleInputChange.bind(this);

    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTemplateCode = this.updateTemplateCode.bind(this);
  }
  componentDidMount() {}
  async handleSingleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    /*  this.setState({
            minitask:{...minitask,[name]:value}
        });*/
    await this.setState((state, props) => ({
      [name]: value
    }));
    await this.setState((state, props) => ({
      template_code: `public ${this.state.output_type_func} ${this.state.name_func}(${this.state.inputList.map((input)=> {return `${input.input_type} ${input.input_name}`}).join()}){ 

      }`
    }));
    // setTimeout(()=>{  },0)
  }

  handleMarkdownChange(value) {
    this.setState({
      mini_task_desc: value
    });
  }

  handleSubmit() {
    console.log(this.state);
  }

  async onSelectChange(select_value) {
    const name = this.output_type_func.current.props.name; //get name of select tag
    await this.setState({
      [name]: select_value.value
    });
    await this.setState((state, props) => ({
      template_code: `public ${this.state.output_type_func} ${this.state.name_func}(${this.state.inputList.map((input)=> {return `${input.input_type} ${input.input_name}`}).join()}){ 

      }`
    }));
  }
  updateTemplateCode(value) {
    this.setState({
      template_code: value
    });
  }

  addInput() {
    this.setState({
      inputList: [
        ...this.state.inputList,
        { input_name: "", input_type: "int" }
      ]
    });
  }
  async handleListInputNameChange(e, index) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.inputList[index].input_name = e.target.value;
    await this.setState({ inputList: this.state.inputList });
    await this.setState((state, props) => ({
      template_code: `public ${this.state.output_type_func} ${this.state.name_func}(${this.state.inputList.map((input)=> {return `${input.input_type} ${input.input_name}`}).join()}){ 

      }`
    }));
  }

  async handleListInputTypeChange(select_value, index) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.inputList[index].input_type = select_value.value;
    await this.setState({ inputList: this.state.inputList });
    await this.setState((state, props) => ({
      template_code: `public ${this.state.output_type_func} ${this.state.name_func}(${this.state.inputList.map((input)=> {return `${input.input_type} ${input.input_name}`}).join()}){ 

      }`
    }));
  }
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>Tạo bài tập</div>
        </div>
        <Grid
          container
          className={classes.CreateMiniTaskBodyContainer}
          spacing={2}
        >
          <Grid item xs={12} sm={6} md={6}>
            <div>Tên bài tập:</div>
            <input name="name" onChange={this.handleSingleInputChange} />
            <div>function name:</div>
            <input name="name_func" onChange={this.handleSingleInputChange} />
            <div>Kiểu trả về:</div>
            <Select
              options={options}
              ref={this.output_type_func}
              name="output_type_func"
              defaultValue={options[0]}
              onChange={this.onSelectChange}
            />
            <div>Mô tả bài toán:</div>
            <ReactMde
              handleMarkdownChange={this.handleMarkdownChange}
              mini_task_desc={this.state.mini_task_desc}
            />
            {this.state.inputList.map((input, index) => {
              return (
                <div key={index}>
                  <div>tên tham số:</div>
                  <input
                    value={input.input_name}
                    onChange={e => this.handleListInputNameChange(e, index)} // higher order function, index và e là biến vẫn được sử dụng sau khi onchange thự thi
                  />{" "}
                  
                  <div>kiểu tham số:</div>
                  <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={select_value =>
                      this.handleListInputTypeChange(select_value, index)
                    } // higher order function
                  />
                </div>
              );
            })}

            <button onClick={e => this.addInput(e)}>Thêm tham số</button>
            <button onClick={this.handleSubmit}>submit</button>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="codeEditor">
              <CodeEditor
                template_code={this.state.template_code}
                updateTemplateCode={this.updateTemplateCode}
              />
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CreateMiniTaskBody);
