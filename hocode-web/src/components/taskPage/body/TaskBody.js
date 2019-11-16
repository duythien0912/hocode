import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import TaskItem from './TaskItem';
import axios from 'axios';
const styles = {
    TasksContainer:{
        
        paddingTop:100,
        background:'#DDDDDD',
        minHeight:'100vh'

    }
  };
class TaskBody extends Component {  
    constructor(props){
        super(props);
        this.state ={
            tasks:[]
        }
    }
    componentDidMount(){
       axios.get(`https://hocodevn.com/api/v1/courses/${this.props.courseId}/tasks`)
        .then(res => {
          const tasks = res.data;
          this.setState({tasks });
        })

       /* setTimeout(()=>{
            console.log(this.state.tasks)
        },2000)*/
    }
    render() {
        const { classes } = this.props;
        const {tasks} = this.state;
        return (
               <Grid container className={classes.TasksContainer} justify='center'>
                   <Grid item  xs={12} sm={6} style={{padding:'0px 10px'}}>
                       {tasks.map((task)=> <TaskItem  key={task.id} task={task} /> )}
                    </Grid> 
                </Grid>  
            
        );
    }
}

export default withStyles(styles)(TaskBody);