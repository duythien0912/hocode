import React, { Component } from 'react';
import CourseBody from './body/CourseBody';
import CourseHeader from './header/CourseHeader';
class CoursePage extends Component {
    render() {
        return (
            <React.Fragment>
                <CourseHeader/>
                <CourseBody/>
            </React.Fragment>
        );
    }
}

export default CoursePage;