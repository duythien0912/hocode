import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LaptopIcon from "@material-ui/icons/Laptop";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import "./hover.css";

const styles = {
  courseItem: {
    borderRadius: "4px",
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
    overflow: "hidden",
    background: "white",
    cursor: "pointer"
  },
  smallAvatar: {
    height: "24px",
    width: "24px",
    marginRight: "4px",
    backgroundColor: deepOrange[500],
    // fontSize: "0.8rem",
    fontSize: "1rem",
    fontWeight:"600",

  }
};
class CourseItem extends Component {
  render() {
    const { classes, course } = this.props;
    return (
      <Grid
        container
        direction="column"
        style={{
          height: "100%",
          display: "flex",
          // justifyContent: "center",
          alignItems: "center"
        }}
        className={`${classes.courseItem} hvr-bounce-in`}
      >
        <Grid
          item
          style={{
            width: "100%",
            overflow: "hidden",
            height: "150px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: `url(${course.background_image}) no-repeat center`,
            backgroundSize: "cover"
          }}
        >
          {/* <img
            src={course.background_image}
            style={{
              width: "50px",
              objectFit: "cover",
              height: "50px",
              borderRadius: "50%",
              marginTop: "10px"
            }}
            alt=""
          /> */}
        </Grid>
        <Grid item container justify="center" style={{ padding: "10px 0 0 0" }}>
          <Grid item xs>
            <div
              style={{
                margin: "0px 12px",
                // textAlign: "center",
                textTransform: "uppercase",
                color: "#595959",
                fontWeight: "bold"
                // fontFamily: `'Yanone Kaffeesatz', sans-serif`
              }}
            >
              <Typography gutterBottom variant="h5" component="h2">
                {course.course_name}
              </Typography>
            </div>

            <div
              style={{
                margin: "5px 12px 10px",
                // textAlign: "center",
                color: "#909090"
                // fontFamily: `'Yanone Kaffeesatz', sans-serif`
              }}
            >
              <Rating name="read-only" value={course.rating_value} read-only precision={0.1} size="large" />{" "}
              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                style={{
                  height: 40,
                  overflow: "hidden",

                  wordBreak: "break-word"
                }}
              >
                {course.course_desc}
              </Typography>
            </div>
            <Divider light />

            <div
              style={{
                margin: "8px 12px",
                textAlign: "center",
                color: "#909090"

                // fontFamily: `'Yanone Kaffeesatz', sans-serif`
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start"
                  }}
                >
                  <Avatar className={classes.smallAvatar}>
                    {course.user_create ? course.user_create.charAt(0).toUpperCase() : "H"}
                  </Avatar>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {/* {course.total_minitask} */}
                    {course.user_create ? course.user_create : "Hocode"}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end"
                  }}
                >
                  <LaptopIcon
                    style={{
                      // color: "#fff",
                      // backgroundColor: "rgba(0, 0, 0, 0.87)",
                      padding: "2px 4px",
                      boxSizing: "content-box",
                      borderRadius: "4px"
                    }}
                    fontSize="small"
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {course.total_minitask}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CourseItem);
