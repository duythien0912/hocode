import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import CourseItem from './CourseItem';
import {  Link } from "react-router-dom";
import axios from 'axios';
const styles = {
    CourseContainer:{
        
        paddingTop:'100px',
        background:'#DDDDDD',
        minHeight:'100vh'
    }
  };
class CourseBody extends Component {
    constructor(props){
        super(props);
        this.state ={
            courses:[]
        }
    }
    componentDidMount(){
        axios.get(`https://hocodevn.com/api/v1/courses`)
        .then(res => {
          const courses = res.data;
          this.setState({courses });
        })
    }
    render() {
        const { classes} = this.props;
        const {courses} = this.state
        return (
               <Grid container className={classes.CourseContainer} justify='center'>
                   <Grid item  xs={12} sm={4} style={{padding:'0px 10px'}}>
                       {courses.map((course)=><Link key={course.id} style={{textDecoration:'none'}}to={`/courses/${course.id}/tasks`}><CourseItem course={course}/></Link>)}
                    </Grid> 
                </Grid>  
        );
    }
}

export default withStyles(styles)(CourseBody);