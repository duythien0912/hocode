/**
 * Generated ModelEvent.js code. Edit at own risk.
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
    ImageField   ,
    DeleteButton,
} from 'react-admin';
import { permitted } from '../utils';

import ModelEventEditToolbar from '../customActions/ModelEventEditToolbar';

import ModelEventFilter from '../filters/ModelEventFilter';



export const ModelEventList = props => (
    <List {...props} title="ModelEvent List" filters={<ModelEventFilter />} bulkActionButtons={false}>
        <Datagrid>
            {/* <TextField                source="content"                sortable={false}            /> */}
            {/* <BooleanField                source="del"                sortable={false}            /> */}
            {/* <TextField                source="id"                sortable={false}            /> */}
            <TextField                source="title"                sortable={false}            />
            <ImageField      className="thumbNailView"                    source="image"                sortable={false}            />
            <TextField                source="link"                sortable={false}            />
            {/* <TextField                source="timestamp"                sortable={false}            /> */}
            <EditButton />
            <DeleteButton />
        </Datagrid></List>
);

export const ModelEventCreate = props => (
    <Create {...props} title="ModelEvent Create">
        <SimpleForm redirect="show">
            <TextInput                source="content"            />
            {/* <BooleanInput                source="del"            /> */}
            {/* <TextInput                source="id"            /> */}
            <TextInput                source="image"            />
            <TextInput                source="link"            />
            {/* <TextInput                source="timestamp"            /> */}
            <TextInput                source="title"            />
        </SimpleForm></Create>
);

export const ModelEventEdit = props => (
    <Edit {...props} title="ModelEvent Edit">
        <SimpleForm toolbar={<ModelEventEditToolbar />}>
            <TextInput                source="content"            />
            {/* <BooleanInput                source="del"            /> */}
            <TextInput                source="id"            />
            <TextInput                source="image"            />
            <TextInput                source="link"            />
            {/* <TextInput                source="timestamp"            /> */}
            <TextInput                source="title"            />
        </SimpleForm></Edit>
);

/** End of Generated Code **/