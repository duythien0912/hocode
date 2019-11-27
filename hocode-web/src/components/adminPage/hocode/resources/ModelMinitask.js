/**
 * Generated ModelMinitask.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from "react";
import MinitaskEdit from "../../../profilePage/content/minitask/MinitaskEdit";
import CreateMiniTaskBody from "../../../profilePage/content/minitask/CreateMiniTaskBody";

import {
  Create,
  Datagrid,
  TextField,
  NumberField,
  BooleanInput,
  SimpleForm,
  List,
  TextInput,
  //   Edit,
  NumberInput,
  //  BooleanField,
  EditButton,
  DeleteButton
} from "react-admin";
//import { permitted } from '../utils';

//import ModelMinitaskEditToolbar from '../customActions/ModelMinitaskEditToolbar';

import ModelMinitaskFilter from "../filters/ModelMinitaskFilter";
//import { getLocationHref } from '@sentry/utils';

export const ModelMinitaskList = props => (
  <List
    {...props}
    title="Danh sách Bài học"
    filters={<ModelMinitaskFilter />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <TextField source="mini_task_name" sortable={false} />
      <NumberField source="code_point" sortable={false} />
      <TextField source="output_type_func" sortable={false} />
      <TextField source="template_code" sortable={false} />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ModelMinitaskCreate = props => (
  <CreateMiniTaskBody/>
  // <Create {...props} title="ModelMinitask Create">
  //   <SimpleForm redirect="show">
  //     <TextInput source="avatar" />
  //     <NumberInput source="code_point" />
  //     <TextInput source="level" />
  //     <TextInput source="mini_task_desc" />
  //     <TextInput source="mini_task_name" />
  //     <TextInput source="name_func" />
  //     <TextInput source="output_type_func" />
  //     <NumberInput source="point_unlock" />
  //     <TextInput source="status" />
  //     <TextInput source="task_id" />
  //     <TextInput source="template_code" />
  //     {/* <TextInput                source="timestamp"            /> */}
  //     <TextInput source="unit_tests" />
  //     <BooleanInput source="vitri" />
  //   </SimpleForm>
  // </Create>
);

export const ModelMinitaskEdit = props => {
  // console.log(props.id);
  //window.location.replace(`/profile/minitasks/${props.id}/edit`)
  return <MinitaskEdit minitasksId={props.id} />;
  // return (
  // <Edit  {...props} title="ModelMinitask Edit">
  //     <SimpleForm toolbar={<ModelMinitaskEditToolbar />}>
  //         <TextInput                source="avatar"            />
  //         <NumberInput                source="code_point"            />
  //         {/* <BooleanInput                source="del"            /> */}
  //         <TextInput                source="id"            />
  //         <TextInput                source="level"            />
  //         <TextInput                source="mini_task_desc"            />
  //         <TextInput                source="mini_task_name"            />
  //         <TextInput                source="name_func"            />
  //         <TextInput                source="output_type_func"            />
  //         <NumberInput                source="point_unlock"            />
  //         <TextInput                source="status"            />
  //         <TextInput                source="task_id"            />
  //         <TextInput                source="template_code"            />
  //         {/* <TextInput                source="timestamp"            /> */}
  //         <TextInput                source="unit_tests"            />
  //         <BooleanInput                source="vitri"            />
  //     </SimpleForm></Edit>);
};

/** End of Generated Code **/
