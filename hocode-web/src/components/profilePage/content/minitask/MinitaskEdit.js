import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import CodeEditor from "./CodeEditor";
import "./createminitaskbody.css";
import ReactMde from "./ReactMde";
import ShowUnitTest from "./ShowUnitTest";


const options = [
  { value: "int", label: "Interger" },
  { value: "String", label: "String" },
  { value: "double", label: "Double" },
  { value: "double[]", label: "Double Array" },
  { value: "String[]", label: "String Array" },
  { value: "int[]", label: "Interger Array" }
];
const optionsLevel = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" }
];
const styles = {
  CreateMiniTaskBodyContainer: {
    minHeight: "100vh",
    padding: 40
  },
  button: {
    textTransform: "none"
  }
};

// const getParams = pathname => {
//   const minitask = matchPath(pathname, {
//     path: `/profile/minitasks/:minitasksId/edit`
//   });
//   return (minitask && minitask.params) || {};
// };
// custom react select style
const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };
class MinitaskEdit extends Component {
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
      level: "",
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
      inputList: [],
      coursesOption: [],
      courses: [],
      tasksOption: [],
      course_id: "", // ban đầu khi gọi api thì set state để cái này có giá trị mặc định
      task_id: "",
      code_point: 0,
      course: { value: "", label: "" },
      task: { value: "", label: "" },
      output_type_func_select: options[0],
      level_ref_select: optionsLevel[0],
      courses_option_select: { value: "", label: "" },
      task_option_select: { value: "", label: "" }
    };
    this.output_type_func = React.createRef();
    this.courses_ref = React.createRef();
    this.tasks_ref = React.createRef();
    this.level_ref = React.createRef();
    this.handleSimpleInputChange = this.handleSimpleInputChange.bind(this);

    this.onSelectChange = this.onSelectChange.bind(this);
    this.onCoursesSelectChange = this.onCoursesSelectChange.bind(this);
    this.onTasksSelectChange = this.onTasksSelectChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTemplateCode = this.updateTemplateCode.bind(this);
    this.handleRemoveInput = this.handleRemoveInput.bind(this);
    this.handleRemoveUnitTest = this.handleRemoveUnitTest.bind(this);
    this.onLevelSelectChange = this.onLevelSelectChange.bind(this);
  }

  componentDidMount() {
    // let location = this.props.location; // cant use this.props.match to get param in url, => pass 'location' from profile page and use matchparam to get param

    //const currentParams = getParams(location.pathname);
    // console.log(currentParams);
    let minitask;
    axios
      .get(`https://hocodevn.com/api/v1/minitasks/${this.props.minitasksId}`)
      .then(res => {
        console.log(res.data);
        minitask = res.data;

        const found = options.find(
          element => element.value === minitask.output_type_func
        );
        const found2 = optionsLevel.find(
          element => element.value === minitask.level
        );

        this.setState({
          template_code: minitask.template_code,
          unit_tests: minitask.unit_tests,
          task_id: minitask.task_id,
          name: minitask.mini_task_name,
          name_func: minitask.name_func,

          output_type_func: minitask.output_type_func,
          point_unlock: minitask.point_unlock,
          status: minitask.status,
          vitri: minitask.vitri,
          mini_task_desc: minitask.mini_task_desc,
          level: minitask.level,
          code_point: minitask.code_point,
          inputList: minitask.input_list || [],

          output_type_func_select: found,
          level_ref_select: found2
        });
      });
    axios.get(`https://hocodevn.com/api/v1/courses`).then(res => {
      const courses = res.data;
      const coursesFilter = courses.filter(course => course.tasks.length > 0); // chọn những courses có task
      const coursesoption = coursesFilter.map(course => {
        return { value: course.id, label: course.course_name };
      });
      // const tasksoption = courses[0].tasks.map(task => {
      //   return { value: task.id, label: task.task_name };
      // });
      const tasksfulloption = [];

      /* eslint-disable array-callback-return */

      for ( let i = 0; i < courses.length; i++) {
        courses[i].tasks.map(tas => {
          tasksfulloption.push({
            value: tas.id,
            label: tas.task_name,
            courses: { value: courses[i].id, label: courses[i].course_name, },
            tasksoption: courses[i].tasks.map((task) => {
              return { value: task.id, label: task.task_name };
            }),
          });
        });
      }
      /* eslint-enable array-callback-return */

      // courses.map(cou => {
      //   cou.tasks.map(tas => {
      //     tasksfulloption.push({ value: tas.id, label: tas.task_name });
      //   });
      // });

      // if (minitask !== null) {
      // const foundCourse = coursesoption.find(
      //   element => element.value === minitask.course_id
      // );
      const foundTask = tasksfulloption.find(
        element => element.value === minitask.task_id
      );
      // }

      console.log(tasksfulloption);
      console.log(foundTask);

      this.setState({
        courses: coursesFilter,
        coursesOption: coursesoption,
        tasksOption: foundTask.tasksoption,
        courses_option_select: foundTask.courses,
        task_option_select: foundTask
      });
    });
  }
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
  async handleSubmit() {
    //  let location = this.props.location; // cant use this.props.match to get param in url, => pass 'location' from profile page and use matchparam to get param

    // const currentParams = getParams(location.pathname);
    const template_code = `public ${this.state.output_type_func} ${
      this.state.name_func
    }(${this.state.inputList
      .map(input => {
        return `${input.input_type} ${input.input_name}`;
      })
      .join()})
{ 
}`;

    let newMiniTask = {
      template_code: template_code,
      unit_tests: this.state.unit_tests,
      task_id: this.state.task_id,
      mini_task_name: this.state.name,
      name_func: this.state.name_func,
      output_type_func: this.state.output_type_func,
      point_unlock: 0,
      status: "chuahoanthanh",
      vitri: false,
      mini_task_desc: this.state.mini_task_desc,
      level: this.state.level,
      code_point: parseInt(this.state.code_point),
      input_list: this.state.inputList
    };
    axios
      .put(
        `https://hocodevn.com/api/v1/curd/minitasks/${this.props.minitasksId}`,
        newMiniTask
      )
      .then(function(response) {
        toast("Sửa bài thành công!", {
          containerId: "B"
        });
        console.log(response);
      });
    console.log(newMiniTask);
  }

  // handle ouput_type_function select change
  onSelectChange(select_value) {
    const name = this.output_type_func.current.props.name; //get name of select tag

    this.setState({
      [name]: select_value.value
    });
  }
  async onCoursesSelectChange(select_value) {
    // mấy chỗ select này coi chừng sai :v
    this.setState((state, props) => ({
      tasksOption: []
    }));
    console.log(select_value);
    const name = this.courses_ref.current.props.name; //get name of select tag
    let course = await this.state.courses.find(function(course) {
      return course.id === select_value.value;
    });
    console.log(course);
    this.setState({
      // khi thay đổi courrse thì thay đổi luôn course id, taskoption, và cho task id mặc định của task đầu tiên trong task option
      [name]: select_value.value,
      tasksOption: course.tasks.map(task => {
        return { value: task.id, label: task.task_name };
      }),
      task_id: course.tasks[0].id,
      courses_option_select: select_value,

    });

  }
  onTasksSelectChange(select_value) {
    const name = this.tasks_ref.current.props.name; //get name of select tag
    this.setState({
      [name]: select_value.value,
      task_option_select: select_value

    });
  }
  onLevelSelectChange(select_value) {
    const name = this.level_ref.current.props.name; //get name of select tag
    this.setState({
      [name]: select_value.value
    });
    console.log(name, select_value);
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
      ],
      unit_tests: []
    });
  }
  handleRemoveInput(index) {
    this.state.inputList.splice(index, 1);
    this.setState({ inputList: this.state.inputList, unit_tests: [] });
  }
  handleRemoveUnitTest(index) {
    this.state.unit_tests.splice(index, 1);
    this.setState({ unit_tests: this.state.unit_tests });
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
    //const inputListLength = this.state.inputList.length;

    let arrayInput = [];
    /* for (let i = 0; i < inputListLength; i++) {
      arrayInput.push({ value: "", type: "int" });
    }*/
    this.state.inputList.forEach(function(input, key) {
      arrayInput.push({ value: "", type: input.input_type });
    });

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
          <div>Sửa bài thực hành</div>
        </div>

        <Grid
          container
          className={classes.CreateMiniTaskBodyContainer}
          spacing={2}
        >
          <Grid item xs={12} sm={6} md={6}>
            <Grid style={{ background: "aliceblue", padding: "8px" }}>
              {this.state.coursesOption[0] !== undefined ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <div>Chọn chủ đề:</div>
                    <Select
                      styles={selectStyles}
                      options={this.state.coursesOption}
                      ref={this.courses_ref}
                      name="course_id"
                      //defaultValue={this.state.coursesOption[0]}
                      onChange={this.onCoursesSelectChange}
                      value={this.state.courses_option_select}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <div>Chọn chủ đề con:</div>
                    <Select
                      styles={selectStyles}
                      options={this.state.tasksOption}
                      ref={this.tasks_ref}
                      name="task_id"
                      //defaultValue={this.state.tasksOption[0]}
                      onChange={this.onTasksSelectChange}
                      value={this.state.task_option_select}
                    />
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <div>Tên bài thực hành:</div>
                  <input
                    name="name"
                    className="input-createminitask"
                    onChange={this.handleSimpleInputChange}
                    value={this.state.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div>Tên Function:</div>
                  <input
                    name="name_func"
                    className="input-createminitask"
                    onChange={this.handleSimpleInputChange}
                    value={this.state.name_func}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div>Số đậu:</div>
                  <input
                    name="code_point"
                    type="number"
                    className="input-createminitask"
                    onChange={this.handleSimpleInputChange}
                    value={this.state.code_point}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <div>Chọn độ khó:</div>
                  <Select
                    styles={selectStyles}
                    options={optionsLevel}
                    value={this.state.level_ref_select}
                    defaultValue={optionsLevel[0]}
                    ref={this.level_ref}
                    name="level"
                    onChange={this.onLevelSelectChange}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={12}>
                  {" "}
                  <div style={{ marginBottom: 10, marginTop: 10 }}>
                    Kiểu trả về:
                  </div>
                  <Select
                    className="select_type"
                    styles={selectStyles}
                    options={options}
                    ref={this.output_type_func}
                    name="output_type_func"
                    value={this.state.output_type_func_select}
                    defaultValue={options[0]}
                    onChange={this.onSelectChange}
                  >
                    {/* {options.map(val => (
                      <MenuItem value={val.value}>{val.label}</MenuItem>
                    ))} */}
                  </Select>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item container xs={12} md={12}>
                  <Grid item xs={12} md={12}>
                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                      Mô tả bài toán:
                    </div>
                  </Grid>

                  <ReactMde
                    handleMarkdownChange={this.handleMarkdownChange}
                    mini_task_desc={this.state.mini_task_desc}
                  />
                </Grid>
              </Grid>
            </Grid>
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
            <Grid container style={{ marginTop: 20 }}>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                style={{ background: "aliceblue", padding: "10px" }}
              >
                <div
                /*   style={{
                    maxHeight: "20vh",
                    position: "relative",
                    overflowY: "scroll",
                    overflowX: "hidden"
                  }}*/
                >
                  {this.state.inputList.map((input, index) => {
                    return (
                      <div key={index}>
                        <Grid container spacing={1}>
                          <Grid item container xs={12} sm={5} spacing={1}>
                            <Grid item xs={12} sm={12}>
                              Tên tham số:
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <input
                                className="input-createminitask"
                                value={input.input_name}
                                onChange={e =>
                                  this.handleListInputNameChange(e, index)
                                } // higher order function, index và e là biến vẫn được sử dụng sau khi onchange thự thi
                              />
                            </Grid>
                          </Grid>
                          <Grid item container xs={12} sm={5} spacing={1}>
                            <Grid item xs={12} sm={12}>
                              kiểu tham số:
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <Select
                                options={options}
                                //defaultValue={options[0]}
                                onChange={select_value =>
                                  this.handleListInputTypeChange(
                                    select_value,
                                    index
                                  )
                                } // higher order function
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            container
                            xs={12}
                            sm={2}
                            style={{ alignItems: "flex-end" }}
                          >
                            <Grid item>
                              <Button
                                className={classes.button}
                                variant="contained"
                                style={{
                                  color: "white",
                                  background: "#ca0000"
                                }}
                                onClick={() => {
                                  this.handleRemoveInput(index);
                                }}
                              >
                                xóa
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider style={{ margin: "5px auto", width: "50%" }} />
                      </div>
                    );
                  })}{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "10px 0px"
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ background: "#2a92ed", color: "white" }}
                    className={classes.button}
                    onClick={e => this.addInput(e)}
                  >
                    Thêm tham số
                  </Button>
                </div>
              </Grid>
              <Divider style={{ margin: "20px auto", width: "50%" }} />
            </Grid>
          </Grid>

          <Grid item container xs={12} sm={12} md={12}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              style={{ justifyContent: "center", textAlign: "center" }}
            >
              {" "}
              Tạo unit test
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              style={{ background: "aliceblue", padding: "10px" }}
            >
              <div
              /*  style={{
                    maxHeight: "30vh",
                    position: "relative",
                    overflowY: "scroll",
                    overflowX: "hidden"
                  }}*/
              >
                {this.state.unit_tests.map((unit_test, index0) => {
                  return (
                    <div key={index0} style={{ padding: 10 }}>
                      {" "}
                      Test {index0 + 1}
                      <Paper style={{ padding: 10 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={12}>
                            Inputs:
                          </Grid>
                          {unit_test.inputs.map((input, index1) => {
                            return (
                              <Grid item xs={12} sm={4} md={4} key={index1}>
                                <input
                                  className="input-createminitask"
                                  value={input.value}
                                  onChange={e =>
                                    this.handleInputTestChange(
                                      e,
                                      index0,
                                      index1
                                    )
                                  }
                                  placeholder={`param ${index1 + 1}`}
                                />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={12}>
                            Out put
                          </Grid>
                          <Grid item xs={12} sm={12} md={12}>
                            <input
                              className="output_createminitask"
                              value={unit_test.expected_output}
                              onChange={e =>
                                this.handleOutputTestChange(e, index0)
                              }
                            />
                          </Grid>
                        </Grid>
                        <Grid container style={{ justifyContent: "center" }}>
                          <Grid item>
                            <Button
                              className={classes.button}
                              variant="contained"
                              style={{ color: "white", background: "#ca0000" }}
                              onClick={() => {
                                this.handleRemoveUnitTest(index0);
                              }}
                            >
                              xóa
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="codeEditorShowUnitTest">
                  <ShowUnitTest
                    output_type_func={this.state.output_type_func}
                    name_func={this.state.name_func}
                    unit_tests={this.state.unit_tests}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 0px"
                }}
              >
                <Button
                  className={classes.button}
                  style={{ background: "#2a92ed", color: "white" }}
                  variant="contained"
                  onClick={e => this.addTest(e)}
                >
                  Thêm test
                </Button>
              </div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={12}
              sm={12}
              style={{ justifyContent: "flex-end", padding: "10px" }}
            >
              <Grid item>
                <Button
                  variant="contained"
                  style={{ background: "#2fbe6f ", color: "white" }}
                  className={classes.button}
                  onClick={this.handleSubmit}
                >
                  Thay đổi
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          position={toast.POSITION.TOP_RIGHT}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MinitaskEdit);
