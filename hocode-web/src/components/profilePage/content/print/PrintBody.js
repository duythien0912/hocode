import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
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
    //   const { isLoading } = this.state;
    return (
      <Grid container spacing={7} style={{ height: "100%" }}>
        <Grid item xs={12} sm={4} md={4}>
          <Paper>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item container style={{ justifyContent: "center" }}>
                <Grid item xs={4} sm={4} md={4}>
                  <img
                    style={{ width: "100%", borderRadius: "50%" }}
                    alt="avatar"
                    src={this.props.user.avatar}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ color: "#4978cc" }}
                >
                  {this.props.user.lastname} {this.props.user.firstname}
                </Typography>
              </Grid>
              <Grid item style={{ textAlign: "center" }}>
                <Typography variant="h5" style={{ color: "#4978cc" }}>
                  {this.props.user.codepoint}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginLeft: 4, color: "#4978cc" }}
                >
                  {/* {course.total_minitask} */}
                  Điểm tích lũy
                </Typography>
              </Grid>

              <Grid item style={{ textAlign: "center" }}>
                <Typography variant="h5" style={{ color: "#4978cc" }}>
                  1
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ marginLeft: 4, color: "#4978cc" }}
                >
                  {/* {course.total_minitask} */}
                  Bài tập đã hoàn thành
                </Typography>
              </Grid>
           
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          Danh sách task
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {})(PrintBody)
);
