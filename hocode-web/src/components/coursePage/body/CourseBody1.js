import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseItem from './CourseItem';
import "./coursebody.css"
const styles = {
  CourseContainer: {
    paddingTop: "100px",
    background: "#DDDDDD",
    minHeight: "100vh"
  },
  courseItem:{
    borderRadius:'4px',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    overflow:'hidden',
    background: '#EEEEEE',
    cursor:'pointer',
    
},
};
class CourseBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }
  componentDidMount() {
    axios.get(`https://hocodevn.com/api/v1/courses`).then(res => {
      const courses = res.data;
      this.setState({ courses });
    });
  }
  render() {
    const { classes } = this.props;
    const {courses} = this.state
    return (
      <Grid container className={classes.CourseContainer} justify="center">
        <Grid item xs={12} sm={12} style={{ padding: "0px 60px" }}>
          <div className = "gallery" >
          {courses.map((course)=><Link className = "item"key={course.id} style={{textDecoration:'none'}}to={`/courses/${course.id}/tasks`}><CourseItem course={course}/></Link>)}
            
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CourseBody);
