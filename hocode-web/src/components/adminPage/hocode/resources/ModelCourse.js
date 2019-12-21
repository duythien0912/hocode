/**
 * Generated ModelCourse.js code. Edit at own risk.
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
  //   BooleanField,
  EditButton,
  DeleteButton,
  ImageField
} from "react-admin";
//import { permitted } from '../utils';

import ModelCourseEditToolbar from "../customActions/ModelCourseEditToolbar";

import ModelCourseFilter from "../filters/ModelCourseFilter";

export const ModelCourseList = props => (
  <List
    {...props}
    title="Danh sách Chủ đề"
    filters={<ModelCourseFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      {/* <TextField                source="id"                sortable={false}            /> */}
      <TextField source="course_name" sortable={false} />
      {/* <TextField source="course_desc" sortable={false} /> */}
      <TextField source="total_minitask" sortable={false} />
      {/* <TextField source="rating_value" sortable={false} /> */}
      <ImageField
        className="thumbNailView"
        source="background_image"
        sortable={false}
      />
      {/* <BooleanField                source="del"                sortable={false}            /> */}
      {/* <                source="tasks"                sortable={false}            /> */}
      {/* <TextField                source="timestamp"                sortable={false}            /> */}
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ModelCourseCreate = props => (
  <Create {...props} title="Tạo Chủ đề">
    <SimpleForm redirect="show">
      <TextInput resettable source="course_name" />
      <TextInput resettable source="background_image" />
      <TextInput resettable multiline source="course_desc" />
      {/* <BooleanInput                source="del"            /> */}
      {/* <TextInput resettable                source="id"            /> */}
      {/* <TextInput resettable                source="tasks"            /> */}
      {/* <TextInput resettable                source="timestamp"            /> */}
    </SimpleForm>
  </Create>
);

export const ModelCourseEdit = props => (
  <Edit {...props} title="Sửa Chủ đề">
    <SimpleForm toolbar={<ModelCourseEditToolbar />}>
      <TextInput resettable source="id" disabled />
      <TextInput resettable source="course_name" />
      <TextInput resettable source="background_image" />
      <TextInput resettable multiline source="course_desc" />
      {/* <BooleanInput                source="del"            /> */}
      {/* <TextInput                source="tasks"            /> */}
      {/* <TextInput                source="timestamp"            /> */}
    </SimpleForm>
  </Edit>
);

/** End of Generated Code **/
