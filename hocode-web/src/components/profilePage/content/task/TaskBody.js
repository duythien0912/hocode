import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import TaskItem from "./TaskItem";
import axios from "axios";
import { matchPath } from "react-router-dom";
const styles = {
  TasksContainer: {
    paddingTop: 30,
    
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
      tasks: []
    };
  }
  componentDidMount() {
    let location = this.props.location; // cant use this.props.match to get param in url, => pass 'location' from profile page and use matchparam to get param

    const currentParams = getParams(location.pathname);
    console.log(currentParams);
    axios
      .get(
        `https://hocodevn.com/api/v1/courses/${currentParams.courseId}/tasks`
      )
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      });

    /* setTimeout(()=>{
            console.log(this.state.tasks)
        },2000)*/
  }
  render() {
    const { classes } = this.props;
    const { tasks } = this.state;
    return (
      <Grid container className={classes.TasksContainer} justify="center">
        <Grid item xs={12} sm={6} style={{ padding: "0px 10px" }}>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TaskBody);
