import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import TaskItem from "./TaskItem";
import axios from "axios";
import { matchPath } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LaptopIcon from "@material-ui/icons/Laptop";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  card: {
    height: 150,
    width: "100%"
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
      course:{}
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
        this.setState({ tasks: tasks1, isLoading: false });
      });
      axios
      .get(
        `https://hocodevn.com/api/v1/courses/${currentParams.courseId}`
      )
      .then(res => {
       
        const course = res.data;
      console.log(course)
        this.setState({ course: course});
      });

    /* setTimeout(()=>{
            console.log(this.state.tasks)
        },2000)*/
  }
  render() {
    const { classes } = this.props;
    const { tasks,course} = this.state;
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
        ) : (
          <React.Fragment>
            <Grid item xs={12} sm={12} style={{ margin: 30 }}>
              <Paper>
                <Grid container style={{ padding: 30 }}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h5" component="h3">
                      {course.course_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <p>
                     {course.course_desc}
                    </p>
                  </Grid>
                  <Grid item xs={12} sm={12} container style={{justifyContent:"space-around"}}>
                    <Grid
                      item
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Avatar className={classes.smallAvatar}>D</Avatar>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{marginLeft:4}}
                      >
                        {/* {course.total_minitask} */}
                        {course.user_create!==""?course.user_create:"Hocode"}
                        
                      </Typography>
                    </Grid>
          
                    <Grid
                    
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                      }}
                    >
                      <LaptopIcon/>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{marginLeft:4}}
                      >
                        {/* {course.total_minitask} */}
                        {course.total_minitask} bài học
                        
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Rating name="a" value={course.rating_value} read-only="true" precision={0.1} size="large" />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{marginLeft:4}}
                      >
                        {/* {course.total_minitask} */}
                        Đánh giá(131)
                      </Typography>
                    </Grid>
                    
                    
                    <Grid
                      item
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start"
                      }}
                    >
                       <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{marginRight:4}}
                      >
                        Tình trạng: 
                      </Typography>
                      <CircularProgress variant="determinate" value={100} />
                    
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} style={{ padding: "0px 10px" }}>
              {tasks.reverse().map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(TaskBody);
