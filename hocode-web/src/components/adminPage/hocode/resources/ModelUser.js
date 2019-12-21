/**
 * Generated ModelUser.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React, { Component } from "react";
import {
Create, Datagrid, DeleteButton, Edit,
  //  BooleanField,
  EditButton, ImageField, List, NumberField, SelectInput, NumberInput,
  //   BooleanInput,
  SimpleForm, TextField, TextInput
} from "react-admin";
//import { permitted } from '../utils';
import ModelUserEditToolbar from "../customActions/ModelUserEditToolbar";
import ModelUserFilter from "../filters/ModelUserFilter";



export const ModelUserList = props => (
  <List
    {...props}
    title="Danh sách Người dùng"
    filters={<ModelUserFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <TextField source="email" sortable={false} />
      <TextField source="firstname" sortable={false} />
      <TextField source="lastname" sortable={false} />
      <NumberField source="codepoint" sortable={false} />
      <TextField source="role" sortable={false} />
      {/* <TextField source="timestamp" sortable={false} /> */}
      <ImageField className="thumbNailView" source="avatar" sortable={false} />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

class ModelUserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var choicesCourse = [
      {
        id: "user",
        name: "Sinh Viên"
      },

      {
        id: "mod",
        name: "Giáo Viên"
      },
      {
        id: "admin",
        name: "Quản Trị Viên"
      }
    ];

    return (
      <Create {...this.props} title="Tạo Người dùng mới">
        <SimpleForm redirect="show">
          <TextInput source="email" />
          <TextInput source="password" />
          <TextInput source="firstname" />
          <TextInput source="lastname" />
          <NumberInput source="codepoint" />
          <TextInput source="avatar" />
          <SelectInput source="role" choices={choicesCourse} />
        </SimpleForm>
      </Create>
    );
  }
}

class ModelUserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var choicesCourse = [
      {
        id: "user",
        name: "Sinh Viên"
      },

      {
        id: "mod",
        name: "Giáo Viên"
      },
      {
        id: "admin",
        name: "Quản Trị Viên"
      }
    ];

    return (
      <Edit {...this.props} title="Sửa Người Dùng">
        <SimpleForm toolbar={<ModelUserEditToolbar />}>
          <TextInput source="email" />
          <TextInput source="password" />
          <TextInput source="firstname" />
          <TextInput source="lastname" />
          <NumberInput source="codepoint" />
          <TextInput source="avatar" />
          {/* <ImageInput source="avatar_input" label="Avatar User" accept="image/*" onUpload={()=> console.log("onUpload")}>
            <ImageField source="src" title="title" />
          </ImageInput> */}

          <SelectInput source="role" choices={choicesCourse} />
        </SimpleForm>
      </Edit>
    );
  }
}

export { ModelUserCreate, ModelUserEdit };

/** End of Generated Code **/
