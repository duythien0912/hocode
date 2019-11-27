/**
 * Generated ModelTask.js code. Edit at own risk.
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

import ModelTaskEditToolbar from "../customActions/ModelTaskEditToolbar";

import ModelTaskFilter from "../filters/ModelTaskFilter";

export const ModelTaskList = props => (
  <List
    {...props}
    title="Danh sách Chủ đề con"
    filters={<ModelTaskFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      {/* <TextField                source="id"                sortable={false}            /> */}
      <TextField source="task_name" sortable={false} />
      <ImageField
        className="thumbNailView"
        source="background_image"
        sortable={false}
      />
      {/* <TextField                source="course_id"                sortable={false}            /> */}
      {/* <BooleanField                source="del"                sortable={false}            /> */}
      {/* <                source="minitasks"                sortable={false}            /> */}
      {/* <TextField                source="timestamp"                sortable={false}            /> */}
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

class ModelTaskCreate extends Component {
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
      <Create {...this.props} title="Tạo Chủ đề con">
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

class ModelTaskEdit extends Component {
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
      <Edit {...this.props} title="Sửa Chủ đề con">
        <SimpleForm toolbar={<ModelTaskEditToolbar />}>
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

export { ModelTaskCreate, ModelTaskEdit };

/** End of Generated Code **/
