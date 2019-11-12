/**
 * Generated ModelEvent.js code. Edit at own risk.
 * When regenerated the changes will be lost.
**/
import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
} from 'react-admin';


import ModelEventFilter from '../filters/ModelEventFilter';

export const ModelEventList = props => (
    <List {...props} title="ModelEvent List" filters={<ModelEventFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField                source="content"                sortable={false}            />
            <BooleanField                source="del"                sortable={false}            />
            <TextField                source="id"                sortable={false}            />
            <TextField                source="image"                sortable={false}            />
            <TextField                source="link"                sortable={false}            />
            <TextField                source="timestamp"                sortable={false}            />
            <TextField                source="title"                sortable={false}            />
        </Datagrid></List>
);

/** End of Generated Code **/