import React, { Component } from 'react';
import TaskBody from './body/TaskBody';
import TaskHeader from './header/TaskHeader';
class TaskPage extends Component {
   
    render() {
        const { match: { params } } = this.props;
        //console.log(params);
        return (
            <React.Fragment>
                <TaskHeader history={this.props.history} />
                <TaskBody courseId={params.courseId}/>
            </React.Fragment>
        );
    }
}

export default TaskPage;