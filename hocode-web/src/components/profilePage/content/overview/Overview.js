import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

const styles = {
  paper: {
    padding: 16,
    marginTop: 16,
    minHeight: 300
  },
  card: {
    maxWidth: "100%"
  },
  media: {
    // width: "100%",

    height: 180,
    objectFit: "cover"
  }
};
const titleCase = string => {
  return string
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      courses: [],
      events: [],
      books: [],
      daily_minitask: {}
    };
    this.getApi = this.getApi.bind(this);
  }
  getApi = async () => {
    await Promise.all([
      axios.get(`https://hocodevn.com/auth/usercourse`).then(res => {
        const courses = res.data;
        console.log(courses);
        this.setState({ courses: courses.course_info });
      }),

      axios.get(`https://hocodevn.com/api/v1/events`).then(res => {
        const events = res.data;
        console.log(events);
        this.setState({ events });
      }),
      axios.get(`https://hocodevn.com/api/v1/books`).then(res => {
        const books = res.data;
        console.log(books);
        this.setState({ books });
      }),
      axios.get(`https://hocodevn.com/api/v1/dailyminitask`).then(res => {
        const daily_minitasks = res.data;
        console.log(daily_minitasks);
        this.setState({ daily_minitasks: daily_minitasks });
      })
    ]);
    this.setState({ isLoading: false });
  };
  componentDidMount() {
    this.getApi();
  }

  renderLevelMinitaskChip(minitask) {
    minitask.level = titleCase(minitask.level);
    console.log(minitask.level);
    if (minitask.level === "Easy") {
      return (
        <Chip
          style={{ background: "#76d38e", color: "white" }}
          size="small"
          label={`${minitask.level}`}
        />
      );
    } else if (minitask.level === "Medium") {
      return (
        <Chip
          style={{ background: "#1d97c6", color: "white" }}
          size="small"
          label={`${minitask.level}`}
        />
      );
    } else {
      return (
        <Chip
          style={{ background: "red", color: "white" }}
          size="small"
          label={`${minitask.level}`}
        />
      );
    }
  }

  render() {
    const { isLoading } = this.state;
    const { classes } = this.props;
    let url = this.props.url;

    return (
      <Grid container spacing={3} style={{ height: "100vh" }}>
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
            <Grid item xs={12} sm={5} md={5}>
              <Paper className={classes.paper}>
                <Grid container style={{ marginBottom: 15 }}>
                  <Grid item style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: "bold" }}>Chủ đề gần đây</div>{" "}
                  </Grid>
                </Grid>
                {this.state.courses.length === 0 ? (
                  <div style={{}}>Bạn chưa thực hiện bài tập nào.</div>
                ) : (
                  this.state.courses.map(course => {
                    return (
                      <React.Fragment key={course.course_id}>
                        <Grid
                          container
                          style={{ alignItems: "center", flexWrap: "unset" }}
                        >
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
                              src={course.background_image}
                            />
                          </Grid>
                          <Grid item style={{ flexGrow: 1, padding: 10 }}>
                            <Tooltip title="Tên chủ đề" placement="top">
                              <div style={{ fontWeight: "bold" }}>
                                <Link
                                  className="item"
                                  key={course.course_id}
                                  style={{ textDecoration: "none" }}
                                  to={`${url}/courses/${course.course_id}/tasks`}
                                >
                                  {course.course_name}
                                </Link>
                              </div>
                            </Tooltip>
                            <Tooltip
                              title="Số lượng bài học đã hoàn thành"
                              placement="top"
                            >
                              <div style={{ color: "#9d9d9d" }}>
                                {course.completed_tasks_count}/
                                {course.total_tasks_count}
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item>
                            <Tooltip title="Tiến độ" placement="top">
                              <LinearProgress
                                variant="determinate"
                                value={
                                  (course.completed_tasks_count /
                                    course.total_tasks_count) *
                                  100
                                }
                                style={{ width: 115 }}
                              />
                            </Tooltip>
                          </Grid>
                        </Grid>
                        <Divider style={{ margin: "auto" }} />{" "}
                      </React.Fragment>
                    );
                  })
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7} md={7}>
              <Paper className={classes.paper}>
                <Grid container style={{ marginBottom: 15 }}>
                  <Grid item style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: "bold" }}>Thách thức mới</div>{" "}
                  </Grid>
                </Grid>

                {this.state.daily_minitasks.map(daily_minitask => {
                  return (
                    <React.Fragment key={daily_minitask.id}>
                      <Grid
                        container
                        style={{ alignItems: "center", flexWrap: "unset" }}
                      >
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
                            src={daily_minitask.avatar}
                          />
                        </Grid>
                        <Grid item style={{ flexGrow: 1, padding: 10 }}>
                          <div style={{ fontWeight: "bold" }}>
                            <Link
                              className="item"
                              style={{ textDecoration: "none" }}
                              to={`/tasks/${daily_minitask.id}`}
                            >
                              {daily_minitask.mini_task_name}
                            </Link>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Tooltip title="Code point" placement="top">
                              <div style={{ color: "#9d9d9d" }}>
                                Số đậu: {daily_minitask.code_point}
                              </div>
                            </Tooltip>
                            <Tooltip title="Độ khó" placement="top">
                              <div style={{ marginLeft: 10 }}>
                                {this.renderLevelMinitaskChip(daily_minitask)}
                              </div>
                            </Tooltip>
                          </div>
                        </Grid>
                        <Grid item>
                          {daily_minitask.status === "hoanthanh" ? (
                            <Tooltip title="Đã hoàn thành" placement="top">
                              {" "}
                              <div
                                style={{
                                  width: "20px",
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: 10
                                }}
                              >
                                <img
                                  style={{ width: "100%" }}
                                  src={require("../icons/hoanthanh.svg")}
                                  alt="Kiwi standing on oval"
                                />
                              </div>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Chưa hoàn thành" placement="top">
                              <div
                                style={{
                                  width: "20px",
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: 10
                                }}
                              >
                                <img
                                  style={{
                                    width: "100%",
                                    backgroundColor: "#F5F5F5",
                                    borderRadius: "50%"
                                  }}
                                  src={require("../icons/chuahoanthanh.svg")}
                                  alt="Kiwi standing on oval"
                                />
                              </div>
                            </Tooltip>
                          )}
                        </Grid>
                      </Grid>
                      <Divider style={{ margin: "auto" }} />{" "}
                    </React.Fragment>
                  );
                })}
              </Paper>
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12}>
              <Paper className={classes.paper}>
                <div style={{ fontWeight: "bold" }}>Sự kiện nổi bật</div>{" "}
                {this.state.events.map(event => {
                  return (
                    <React.Fragment key={event.id}>
                      <Grid
                        style={{
                          border: "1px solid #0000001f",
                          borderRadius: "4px",
                          marginTop: 10,
                          marginBottom: 10
                        }}
                      >
                        <Card className={classes.card}>
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            <CardActionArea>
    
                              <img
                                style={{
                                  width: "100%",
                                  height: "100",
                                  objectFit: "cover"
                                }}
                                alt="complex"
                                src={event.image}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h2"
                                >
                                  {event.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {event.content}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </a>
                        </Card>           
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Paper>
            </Grid> */}
          </React.Fragment>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootReducer.user
});
export default withStyles(styles)(connect(mapStateToProps, {})(Overview));
