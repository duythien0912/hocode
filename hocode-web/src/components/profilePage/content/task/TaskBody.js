import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import TaskItem from "./TaskItem";
import axios from "axios";
import { matchPath } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Card from '@material-ui/core/Card';

const styles = {
  card: {
    height: 150,
    width: "100%",
  },

  TasksContainer: {
    // paddingTop: 30,
    
    minHeight: "100vh"
  }
};
const getParams = pathname => {
  const course = matchPath(pathname, {
    path: `/profile/courses/:courseId/tasks`
  });
  return (course && course.params) || {};
};
class TaskBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    let location = this.props.location; // cant use this.props.match to get param in url, => pass 'location' from profile page and use matchparam to get param

    const currentParams = getParams(location.pathname);
    console.log(currentParams);
    axios
      .get(
        `https://hocodevn.com/api/v1/auth/courses/${currentParams.courseId}/tasks`
      )
      .then(res => {
        console.log(res.data);
        const tasks = res.data;
        let tasks1 = tasks.reverse();
        this.setState({ tasks:tasks1, isLoading: false });
      });

    /* setTimeout(()=>{
            console.log(this.state.tasks)
        },2000)*/
  }
  render() {
    const { classes } = this.props;
    const { tasks } = this.state;
    const { isLoading } = this.state;
    return (
      
      <Grid container className={classes.TasksContainer} justify="center">
    {/* <Card className={classes.card}>
</Card> */}
        {isLoading ? (
          <div
            className="sweet-loading"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100vh"
            }}
          >
            <HashLoader
              sizeUnit={"px"}
              size={50}
              color={"#AEA8A8"}
              loading={isLoading}
            />
          </div>
        ):(
        <Grid item xs={12} sm={6} style={{ padding: "0px 10px" }}>
          {tasks.reverse().map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Grid>)}

      </Grid>
    );
  }
}

export default withStyles(styles)(TaskBody);
