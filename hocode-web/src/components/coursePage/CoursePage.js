import React, { Component } from 'react';
import CourseBody from './body/CourseBody1';
import CourseHeader from './header/CourseHeader';
class CoursePage extends Component {
    render() {
        return (
            <React.Fragment>
                <CourseHeader history={this.props.history}/>
                <CourseBody/>
            </React.Fragment>
        );
    }
}

export default CoursePage;