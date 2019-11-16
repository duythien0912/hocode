/**
 * Generated ModelCourse.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    Create,
    Datagrid,
    TextField,
    BooleanInput,
    SimpleForm,
    List,
    TextInput,
    Edit,
    BooleanField,
    EditButton,
    DeleteButton,
} from 'react-admin';
import { permitted } from '../utils';

import ModelCourseEditToolbar from '../customActions/ModelCourseEditToolbar';

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
            <EditButton />
            <DeleteButton />
        </Datagrid></List>
);

export const ModelCourseCreate = props => (
    <Create {...props} title="ModelCourse Create">
        <SimpleForm redirect="show">
            <TextInput                source="background_image"            />
            <TextInput                source="course_name"            />
            <BooleanInput                source="del"            />
            <TextInput                source="id"            />
            <TextInput                source="tasks"            />
            <TextInput                source="timestamp"            />
        </SimpleForm></Create>
);

export const ModelCourseEdit = props => (
    <Edit {...props} title="ModelCourse Edit">
        <SimpleForm toolbar={<ModelCourseEditToolbar />}>
            <TextInput                source="background_image"            />
            <TextInput                source="course_name"            />
            <BooleanInput                source="del"            />
            <TextInput                source="id"            />
            <TextInput                source="tasks"            />
            <TextInput                source="timestamp"            />
        </SimpleForm></Edit>
);

/** End of Generated Code **/