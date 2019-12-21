/**
 * Generated ModelCert.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import MUITextField from "@material-ui/core/TextField";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import React, { Component } from "react";
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  //  BooleanField,
  EditButton,
  List,
  //   BooleanInput,
  SimpleForm,
  TextField,
  TextInput,
  // BooleanField,
  // FunctionField,
  // SelectField,
  SelectInput
} from "react-admin";
//import { permitted } from '../utils';
import ModelCertEditToolbar from "../customActions/ModelCertEditToolbar";
import ModelCertFilter from "../filters/ModelCertFilter";

import ReviewField from "../fields/ReviewField";

// const choices = [
//   { _id: "Active", status: "Đồng ý" },
//   { _id: "Peding", status: "Đang xét duyệt" },
//   { _id: "Inactive", status: "Từ chối" }
// ];

const choicesCourse = [
  { id: "Active", name: "Đồng ý" },
  { id: "Peding", name: "Đang xét duyệt" },
  { id: "Inactive", name: "Từ chối" }
];

class ModelCertList extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      name_site: "hocode",
      review_point: 0,
      electronic_signature: "",
      isLoading: true,
      data: {}
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://hocodevn.com/api/v1/curd/configs/byname/${this.state.name_site}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          name: res.data.name,
          review_point: res.data.review_point,
          electronic_signature: res.data.electronic_signature,
          data: res.data,
          isLoading: false
        });
      });
  }

  handleChange = event => {
    var xName = event.target.id;

    this.setState({ [xName]: event.target.value });
  };

  onChangeImage = ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = e => {
      this.setState({ electronic_signature: e.target.result });
    };
  };

  handleSubmit = event => {
    //Make a network call somewhere
    event.preventDefault();

    var dataUpdate = this.state.data;
    dataUpdate.name = this.state.name;
    dataUpdate.name_site = this.state.name_site;
    dataUpdate.review_point = parseInt(this.state.review_point);
    dataUpdate.electronic_signature = this.state.electronic_signature;

    this.setState({ isLoading: true });
    axios
      .post(`https://hocodevn.com/api/v1/curd/configs`, dataUpdate)
      .then(res => {
        this.setState({
          name: res.data.name,
          review_point: res.data.review_point,
          electronic_signature: res.data.electronic_signature,
          data: res.data,
          isLoading: false
        });
      });
  };

  render() {
    // const matches = useMediaQuery('(min-width:600px)');
    return (
      <>
        <Grid container spacing={3} className="configFormContainer">
          <Grid item xs={3} className="configFormContainerItem">
            {/* <span>{`(min-width:600px) matches: ${matches}`}</span> */}
            <Card style={{ padding: 12 }}>
              <form onSubmit={this.handleSubmit}>
                {/* <div>
                {this.state.isLoading ? (
                  <Skeleton height={77} />
                ) : (
                  <MUITextField
                    id="name_site"
                    label="Tên Cài Đặt"
                    margin="normal"
                    defaultValue={this.state.name_site}
                    onChange={this.handleChange}
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                )}
              </div> */}
                <div>
                  {this.state.isLoading ? (
                    <Skeleton height={77} />
                  ) : (
                    <MUITextField
                      id="name"
                      label="Tên Chứng Chỉ"
                      margin="normal"
                      defaultValue={this.state.name}
                      onChange={this.handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </div>
                <div>
                  {this.state.isLoading ? (
                    <Skeleton height={77} />
                  ) : (
                    <MUITextField
                      id="review_point"
                      label="Đậu Tốt Nghiệp"
                      margin="normal"
                      type="number"
                      defaultValue={this.state.review_point}
                      onChange={this.handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </div>
                <div>
                  {this.state.isLoading ? (
                    <Skeleton height={77} />
                  ) : (
                    <Button
                      className="MuiFormControl-marginNormal"
                      variant="contained"
                      component="label"
                      fullWidth
                    >
                      Tải Chữ Ký
                      <input
                        id="electronic_signature"
                        type="file"
                        accept="image/*"
                        onChange={this.onChangeImage}
                        style={{ display: "none" }}
                      />
                    </Button>
                  )}
                </div>
                <div>
                  {this.state.isLoading ? (
                    <Skeleton height={120} />
                  ) : (
                    <Avatar
                      style={{
                        width: "auto",
                        height: "auto"
                      }}
                      className="MuiFormControl-marginNormal"
                      src={
                        this.state.electronic_signature
                          ? this.state.electronic_signature
                          : "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
                      }
                      variant="rounded"
                    ></Avatar>
                  )}
                </div>
                {/* <TextField
          id="standard-basic"
          className={classes.textField}
          label="Standard"
          margin="normal"
        /> */}

                <Button
                  type="submit"
                  color="primary"
                  className="MuiFormControl-marginNormal"
                  style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                  fullWidth
                >
                  Lưu cài đặt
                </Button>
              </form>
            </Card>
          </Grid>

          {/* <Button>Lưu cài đặt</Button> */}
          <Grid item xs={9} className="configFormContainerItem">
            <List
              {...this.props}
              title="Danh sách Chứng chỉ"
              filters={<ModelCertFilter />}
              bulkActionButtons={false}
            >
              <Datagrid>
                <TextField source="user_id" sortable={false} />
                {/* <TextField source="status" sortable={false} /> */}
                {/* <SelectField
                  source="status"
                  choices={choices}
                  optionText="status"
                  optionValue="_id"
                /> */}

                {/* <Button size="small"  variant="contained" color="primary">
  Đồng ý
</Button>
<Button size="small"  variant="contained" color="secondary">
  Từ chối
</Button> */}

                <ReviewField source="status" />
                <TextField source="timestamp" sortable={false} />
                {/* <BooleanField source="agree" /> */}

                {/* <FunctionField
                label="Author"
                sortBy="last_name"
                render={record => {
                  console.log(record);
                  return  `${record.agree} ${record.status}`;
                }}
            /> */}

                <EditButton />
                <DeleteButton />
              </Datagrid>
            </List>
          </Grid>
        </Grid>
      </>
    );
  }
}

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
    // var choicesCourse = this.state.course.map(val => {
    //   var rObj = {};
    //   rObj["id"] = val.id;
    //   rObj["name"] = val.course_name;
    //   return rObj;
    // });

    return (
      <Create {...this.props} title="Tạo Chứng chỉ">
        <SimpleForm redirect="show">
          <TextInput source="user_id" />
          <SelectInput source="status" choices={choicesCourse} />

          {/* <TextInput source="time" /> */}
          {/* {this.state.isLoading ? (
            <Skeleton />
          ) : (
            <SelectInput source="course_id" choices={choicesCourse} />
          )} */}
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
    // var choicesCourse = this.state.course.map(val => {
    //   var rObj = {};
    //   rObj["id"] = val.id;
    //   rObj["name"] = val.course_name;
    //   return rObj;
    // });

    return (
      <Edit {...this.props} title="Sửa Chứng chỉ">
        <SimpleForm toolbar={<ModelCertEditToolbar />}>
          <TextInput resettable source="id" disabled />
          {/* <TextInput source="task_name" />
          <TextInput source="background_image" /> */}
          <TextInput source="user_id" />

          <SelectInput source="status" choices={choicesCourse} />

          {/* <TextInput source="time" /> */}

          {/* {this.state.isLoading ? (
            <Skeleton />
          ) : (
            <SelectInput source="course_id" choices={choicesCourse} />
          )} */}

          {/* <BooleanInput                source="del"            /> */}
          {/* <TextInput                source="id"            /> */}
          {/* <TextInput                source="minitasks"            /> */}
          {/* <TextInput                source="timestamp"            /> */}
        </SimpleForm>
      </Edit>
    );
  }
}

export { ModelCertList, ModelCertCreate, ModelCertEdit };

/** End of Generated Code **/
