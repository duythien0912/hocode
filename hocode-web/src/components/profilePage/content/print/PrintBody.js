import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
const styles = {};

class PrintBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minitasks: [],

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
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%"
                    }}
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
          <Paper style={{ minHeight: "50%",display:"flex",flexDirection:"column" }}>
            <Grid container spacing={2} style={{ paddingLeft: 10 }}>
              <Grid item style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: "bold" }}>
                  Danh sách bài tập đã hoàn thành
                </div>{" "}
              </Grid>
            </Grid>

            {this.state.minitasks.length !== 0 ? (
              this.state.minitasks.map(minitask => {
                return (
                  <React.Fragment key={minitask.id}>
                    <Grid container style={{ alignItems: "center" }}>
                      <Grid item>
                        <img
                          className={classes.img}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "8px"
                          }}
                          alt="complex"
                          src={minitask.avatar}
                        />
                      </Grid>
                      <Grid item style={{ flexGrow: 1, padding: 10 }}>
                        <div style={{ fontWeight: "bold" }}>
                          <Link
                            className="item"
                            style={{ textDecoration: "none" }}
                            to={`/tasks/${minitask.id}`}
                          >
                            {minitask.mini_task_name}
                          </Link>
                        </div>
                        <div style={{ color: "#9d9d9d" }}>
                          Code Point: {minitask.code_point}
                        </div>
                      </Grid>
                    </Grid>
                    <Divider style={{ margin: "auto" }} />{" "}
                  </React.Fragment>
                );
              })
            ) : (
              <Grid container justify="center" alignItems="center" style={{flexGrow:1}}>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ marginLeft: 4 }}
                  >
                    Bạn chưa hoàn thành bài tập nào.
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
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
