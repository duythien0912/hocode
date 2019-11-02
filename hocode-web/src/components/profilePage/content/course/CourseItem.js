import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import './hover.css';
const styles = {
 courseItem:{
     borderRadius:'4px',
     boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
     overflow:'hidden',
     background: 'white',
     cursor:'pointer',
     
 },
};
class CourseItem extends Component {
  render() {
    const { classes,course } = this.props;
    return (
      <Grid
      container
      direction="column"
      style={{height:"100%",display:'flex',justifyContent:'center',alignItems:'center'}}
      className={`${classes.courseItem} hvr-bounce-in`}
    >
      <Grid
        item
        style={{  width: "100%", overflow: "hidden",display:'flex',justifyContent:'center',alignItems:'center' }}
      >
        <img
          src={course.background_image}
          style={{ width: "50px",objectFit:"cover", height:'50px',borderRadius:'50%',marginTop:"10px"}}
          alt=""
        />
      </Grid>
      <Grid
        item
        container
        justify="center"
        style={{ padding: "10px 0" }}
      >
        <Grid item>
          <div
            style={{
              margin: "5px 0",
              textAlign: "center",
              textTransform: "uppercase",
              color: "#595959",
              fontWeight: "bold",
              fontFamily: `'Yanone Kaffeesatz', sans-serif`
            }}
          >
            {course.course_name}
          </div>
          <div
            style={{
              margin: "5px 0",
              textAlign: "center",
              color: "#909090",
              fontFamily: `'Yanone Kaffeesatz', sans-serif`
            }}
          >
            Task đã làm: {course.task_solved.tasks_complete}/{course.task_solved.task_count}
          </div>
        </Grid>
      </Grid>
    </Grid>
    );
  }
}

export default withStyles(styles)(CourseItem);
