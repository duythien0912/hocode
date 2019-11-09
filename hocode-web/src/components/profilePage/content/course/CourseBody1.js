import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseItem from './CourseItem';
import "./coursebody.css";
import HashLoader from "react-spinners/HashLoader";
const styles = {
  CourseContainer: {
    paddingTop: "30px",
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
      isLoading:true,
      courses: []
    };
  }
  getApi=async () =>{
    await Promise.all([
      axios.get(`https://hocode.appspot.com/api/v1/courses`).then(res => {
        const courses = res.data;
        console.log(courses)
        this.setState({ courses });
      })]
    );
    this.setState({isLoading:false})
  }
  componentDidMount() {
    this.getApi();
  }
  render() {
    const { classes } = this.props;
    const {courses,isLoading} = this.state;
    let url = this.props.url;
  
    return (
      <Grid container className={classes.CourseContainer} justify="center">
          {isLoading?<div className="sweet-loading" style={{display:'flex',alignItems:"center",justifyContent:'center',width:'100%'}}>
              <HashLoader
              
                sizeUnit={"px"}
                size={50}
                color={"#AEA8A8"}
                loading={isLoading}
              />
            </div> : (<React.Fragment><Grid item xs={12} sm={12} style={{ padding: "0px 60px" }}>
          <div className = "gallery" >
          {courses.map((course)=><Link className = "item"key={course.id} style={{textDecoration:'none'}}to={`${url}/courses/${course.id}/tasks`}><CourseItem course={course}/></Link>)}
          </div>
        </Grid></React.Fragment>)}  
      </Grid>
    );
  }
}

export default withStyles(styles)(CourseBody);
