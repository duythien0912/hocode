/**
 * Generated ModelCert.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React, { Component } from "react";
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
  DeleteButton,
  ImageField,
  SelectInput
} from "react-admin";
import Skeleton from "@material-ui/lab/Skeleton";

import axios from "axios";
//import { permitted } from '../utils';

import ModelCertEditToolbar from "../customActions/ModelCertEditToolbar";

import ModelCertFilter from "../filters/ModelCertFilter";

export const ModelCertList = props => (
  <List
    {...props}
    title="Danh sách Chứng chỉ"
    filters={<ModelCertFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <TextField source="user_id" sortable={false} />
      <TextField source="status" sortable={false} />
      <TextField source="timestamp" sortable={false} />
     
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

class ModelCertCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get("https://hocodevn.com/api/v1/courses").then(res => {
      this.setState({ course: res.data, isLoading: false });
    });
  }

  render() {
    var choicesCourse = this.state.course.map(val => {
      var rObj = {};
      rObj["id"] = val.id;
      rObj["name"] = val.course_name;
      return rObj;
    });

    return (
      <Create {...this.props} title="Tạo Chứng chỉ">
        <SimpleForm redirect="show">
          <TextInput source="task_name" />
          <TextInput source="background_image" />
          {this.state.isLoading ? (
            <Skeleton />
          ) : (
            <SelectInput source="course_id" choices={choicesCourse} />
          )}
          {/* <BooleanInput                source="del"            /> */}
          {/* <TextInput                source="id"            /> */}
          {/* <TextInput                source="minitasks"            /> */}
          {/* <TextInput                source="timestamp"            /> */}
        </SimpleForm>
      </Create>
    );
  }
}

class ModelCertEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios.get("https://hocodevn.com/api/v1/courses").then(res => {
      this.setState({ course: res.data, isLoading: false });
    });
  }

  render() {
    var choicesCourse = this.state.course.map(val => {
      var rObj = {};
      rObj["id"] = val.id;
      rObj["name"] = val.course_name;
      return rObj;
    });

    return (
      <Edit {...this.props} title="Sửa Chứng chỉ">
        <SimpleForm toolbar={<ModelCertEditToolbar />}>
          <TextInput resettable source="id" disabled />
          <TextInput source="task_name" />
          <TextInput source="background_image" />
          {this.state.isLoading ? (
            <Skeleton />
          ) : (
            <SelectInput source="course_id" choices={choicesCourse} />
          )}

          {/* <BooleanInput                source="del"            /> */}
          {/* <TextInput                source="id"            /> */}
          {/* <TextInput                source="minitasks"            /> */}
          {/* <TextInput                source="timestamp"            /> */}
        </SimpleForm>
      </Edit>
    );
  }
}

export { ModelCertCreate, ModelCertEdit };

/** End of Generated Code **/
