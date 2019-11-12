/**
 * Generated ModelTask.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
} from 'react-admin';


import ModelTaskFilter from '../filters/ModelTaskFilter';

export const ModelTaskList = props => (
    <List {...props} title="ModelTask List" filters={<ModelTaskFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField                source="background_image"                sortable={false}            />
            <TextField                source="course_id"                sortable={false}            />
            <BooleanField                source="del"                sortable={false}            />
            <TextField                source="id"                sortable={false}            />
            {/* <                source="minitasks"                sortable={false}            /> */}
            <TextField                source="task_name"                sortable={false}            />
            <TextField                source="timestamp"                sortable={false}            />
        </Datagrid></List>
);

/** End of Generated Code **/