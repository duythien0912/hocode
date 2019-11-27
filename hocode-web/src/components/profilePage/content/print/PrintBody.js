import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
const styles = {};

class PrintBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: true
    };
  }
  componentDidMount() {
    // let location = this.props.location; // cant use this.props.match to get param in url, => pass 'location' from profile page and use matchparam to get param
    // const currentParams = getParams(location.pathname);
    // console.log(currentParams);
    // axios
    //   .get(
    //     `https://hocodevn.com/api/v1/auth/courses/${currentParams.courseId}/tasks`
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     const tasks = res.data;
    //     let tasks1 = tasks.reverse();
    //     this.setState({ tasks: tasks1, isLoading: false });
    //   });
    /* setTimeout(()=>{
            console.log(this.state.tasks)
        },2000)*/
  }
  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;
    return (
      <Grid
        container
        className={classes.TasksContainer}
        justify="center"
      >
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
          In chứng chỉ
          </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(PrintBody);
