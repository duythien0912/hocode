/**
 * Generated ModelBook.js code. Edit at own risk.
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

import ModelBookEditToolbar from '../customActions/ModelBookEditToolbar';

import ModelBookFilter from '../filters/ModelBookFilter';



export const ModelBookList = props => (
    <List {...props} title="ModelBook List" filters={<ModelBookFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField                source="content"                sortable={false}            />
            <BooleanField                source="del"                sortable={false}            />
            <TextField                source="id"                sortable={false}            />
            <TextField                source="image"                sortable={false}            />
            <TextField                source="timestamp"                sortable={false}            />
            <TextField                source="title"                sortable={false}            />
            <EditButton />
            <DeleteButton />
        </Datagrid></List>
);

export const ModelBookCreate = props => (
    <Create {...props} title="ModelBook Create">
        <SimpleForm redirect="show">
            <TextInput                source="content"            />
            <BooleanInput                source="del"            />
            <TextInput                source="id"            />
            <TextInput                source="image"            />
            <TextInput                source="timestamp"            />
            <TextInput                source="title"            />
        </SimpleForm></Create>
);

export const ModelBookEdit = props => (
    <Edit {...props} title="ModelBook Edit">
        <SimpleForm toolbar={<ModelBookEditToolbar />}>
            <TextInput                source="content"            />
            <BooleanInput                source="del"            />
            <TextInput                source="id"            />
            <TextInput                source="image"            />
            <TextInput                source="timestamp"            />
            <TextInput                source="title"            />
        </SimpleForm></Edit>
);

/** End of Generated Code **/