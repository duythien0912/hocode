/**
 * Generated ModelTask.js code. Edit at own risk.
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
    ImageField,
} from 'react-admin';
import { permitted } from '../utils';

import ModelTaskEditToolbar from '../customActions/ModelTaskEditToolbar';

import ModelTaskFilter from '../filters/ModelTaskFilter';



export const ModelTaskList = props => (
    <List {...props} title="ModelTask List" filters={<ModelTaskFilter />} bulkActionButtons={false}>
        <Datagrid>
        {/* <TextField                source="id"                sortable={false}            /> */}
        <TextField                source="task_name"                sortable={false}            />
            <ImageField      className="thumbNailView"              source="background_image"                sortable={false}            />
            {/* <TextField                source="course_id"                sortable={false}            /> */}
            {/* <BooleanField                source="del"                sortable={false}            /> */}
            {/* <                source="minitasks"                sortable={false}            /> */}
            {/* <TextField                source="timestamp"                sortable={false}            /> */}
            <EditButton />
            <DeleteButton />
        </Datagrid></List>
);

export const ModelTaskCreate = props => (
    <Create {...props} title="ModelTask Create">
        <SimpleForm redirect="show">
            <TextInput                source="background_image"            />
            <TextInput                source="course_id"            />
            {/* <BooleanInput                source="del"            /> */}
            {/* <TextInput                source="id"            /> */}
            <TextInput                source="minitasks"            />
            <TextInput                source="task_name"            />
            {/* <TextInput                source="timestamp"            /> */}
        </SimpleForm></Create>
);

export const ModelTaskEdit = props => (
    <Edit {...props} title="ModelTask Edit">
        <SimpleForm toolbar={<ModelTaskEditToolbar />}>
            <TextInput                source="background_image"            />
            <TextInput                source="course_id"            />
            {/* <BooleanInput                source="del"            /> */}
            <TextInput                source="id"            />
            <TextInput                source="minitasks"            />
            <TextInput                source="task_name"            />
            {/* <TextInput                source="timestamp"            /> */}
        </SimpleForm></Edit>
);

/** End of Generated Code **/