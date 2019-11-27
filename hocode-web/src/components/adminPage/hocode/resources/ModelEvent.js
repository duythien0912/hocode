/**
 * Generated ModelEvent.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from "react";
import {
  Create,
  Datagrid,
  TextField,
  //   BooleanInput,
  SimpleForm,
  List,
  TextInput,
  Edit,
  //  BooleanField,
  EditButton,
  ImageField,
  DeleteButton
} from "react-admin";
//import { permitted } from '../utils';

import ModelEventEditToolbar from "../customActions/ModelEventEditToolbar";

import ModelEventFilter from "../filters/ModelEventFilter";

export const ModelEventList = props => (
  <List
    {...props}
    title="Danh sách Sự kiện"
    filters={<ModelEventFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <TextField source="title" sortable={false} />
      <TextField source="link" sortable={false} />
      <ImageField className="thumbNailView" source="image" sortable={false} />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ModelEventCreate = props => (
  <Create {...props} title="Tạo Sự kiện">
    <SimpleForm redirect="show">
      <TextInput resettable source="title" />
      <TextInput resettable source="link" />
      <TextInput resettable source="image" />
      <TextInput resettable multiline source="content" />
    </SimpleForm>
  </Create>
);

export const ModelEventEdit = props => (
  <Edit {...props} title="Sửa Sự kiện">
    <SimpleForm toolbar={<ModelEventEditToolbar />}>
      <TextInput resettable source="id" disabled />
      <TextInput resettable source="title" />
      <TextInput resettable source="link" />
      <TextInput resettable source="image" />
      <TextInput resettable multiline source="content" />
    </SimpleForm>
  </Edit>
);

/** End of Generated Code **/
