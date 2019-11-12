/**
 * Generated ModelCourse.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
} from 'react-admin';


import ModelCourseFilter from '../filters/ModelCourseFilter';

export const ModelCourseList = props => (
    <List {...props} title="ModelCourse List" filters={<ModelCourseFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField                source="background_image"                sortable={false}            />
            <TextField                source="course_name"                sortable={false}            />
            <BooleanField                source="del"                sortable={false}            />
            <TextField                source="id"                sortable={false}            />
            {/* <                source="tasks"                sortable={false}            /> */}
            <TextField                source="timestamp"                sortable={false}            />
        </Datagrid></List>
);

/** End of Generated Code **/