/**
 * Generated ModelBook.js code. Edit at own risk.
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
  ImageField,
  EditButton,
  DeleteButton
} from "react-admin";
//import { permitted } from '../utils';

import ModelBookEditToolbar from "../customActions/ModelBookEditToolbar";

import ModelBookFilter from "../filters/ModelBookFilter";

export const ModelBookList = props => (
  <List
    {...props}
    title="Danh sách Sách lập trình"
    filters={<ModelBookFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <TextField source="title" sortable={false} />
      <ImageField className="thumbNailView" source="image" sortable={false} />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ModelBookCreate = props => (
  <Create {...props} title="Tạo Sách lập trình">
    <SimpleForm redirect="show">
      <TextInput resettable source="title" />
      <TextInput resettable source="image" />
      <TextInput resettable multiline source="content" />
    </SimpleForm>
  </Create>
);

export const ModelBookEdit = props => (
  <Edit {...props} title="Sửa Sách lập trình">
    <SimpleForm toolbar={<ModelBookEditToolbar />}>
      <TextInput resettable source="id" disabled />
      <TextInput resettable source="title" />
      <TextInput resettable source="image" />
      <TextInput resettable multiline source="content" />
    </SimpleForm>
  </Edit>
);

/** End of Generated Code **/
