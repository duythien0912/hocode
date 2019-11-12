/**
 * Generated ModelMinitask.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    TextField,
    BooleanField,
    List,
    Datagrid,
    NumberField,
} from 'react-admin';


import ModelMinitaskFilter from '../filters/ModelMinitaskFilter';

export const ModelMinitaskList = props => (
    <List {...props} title="ModelMinitask List" filters={<ModelMinitaskFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField                source="avatar"                sortable={false}            />
            <NumberField                source="code_point"                sortable={false}            />
            <BooleanField                source="del"                sortable={false}            />
            <TextField                source="id"                sortable={false}            />
            <TextField                source="level"                sortable={false}            />
            <TextField                source="mini_task_desc"                sortable={false}            />
            <TextField                source="mini_task_name"                sortable={false}            />
            <TextField                source="name_func"                sortable={false}            />
            <TextField                source="output_type_func"                sortable={false}            />
            <NumberField                source="point_unlock"                sortable={false}            />
            <TextField                source="status"                sortable={false}            />
            <TextField                source="task_id"                sortable={false}            />
            <TextField                source="template_code"                sortable={false}            />
            <TextField                source="timestamp"                sortable={false}            />
            {/* <                source="unit_tests"                sortable={false}            /> */}
            <BooleanField                source="vitri"                sortable={false}            />
        </Datagrid></List>
);

/** End of Generated Code **/