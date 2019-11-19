import React, { Component } from 'react';
import HomePageHeader from './header/HomePageHeader'

class TaskPage extends Component {

    render() {
        const { match: { params } } = this.props;
        console.log(params);
        return (
            <React.Fragment>

                <HomePageHeader />
                {/* <TaskBody courseId={params.courseId}/> */}
            </React.Fragment>
        );
    }
}

export default TaskPage;