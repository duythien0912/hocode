import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import { changeUserInfo } from "../../../../js/actions/userAction";
import { connect } from "react-redux";
import { regexPassword } from "../../../../common/regex";
import Paper from "@material-ui/core/Paper";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3f51b5"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#3f51b5"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3f51b5"
      },
      "&:hover fieldset": {
        borderColor: "#3f51b5"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3f51b5"
      }
    }
  }
})(TextField);

const styles = {
  "@global": {
    body: {
      backgroundColor: "white"
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: 8,
    backgroundColor: "#3f51b5"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 8
  },
  submit: {
    margin: "16px 0px"
  }
};

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      lastName: "", //họ
      firstName: "",
      password: "",
      password2: "",
      avatar: "",
      errors: {},
      errorForm: {
        lastName: "",
        firstName: "",
        password: "",
        password2: ""
      },
      image: null,
      url: "",
      urlPreview: ""
    };
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.toBase64 = this.toBase64.bind(this);
    this.ImgToBase64 = this.ImgToBase64.bind(this);
  }
  getApi = async () => {
    await Promise.all([
      axios
        .get("https://hocode.appspot.com/auth/userinfo")
        .then(res => {
          this.setState({
            firstName: res.data.firstname,
            lastName: res.data.lastname,
            avatar: res.data.avatar
          });
        })
        .catch(err => console.log(err))
    ]);
    this.setState({ isLoading: false });
  };
  componentDidMount() {
    this.getApi();
  }
  async handleChangeImage(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const urlimage = URL.createObjectURL(image);
      let image1 = await this.ImgToBase64(image);
      await this.setState({ image: image1, urlPreview: urlimage });
    }
  }
  onChange = e => {
    let isError = false;
    this.setState({
      errors: { message: "" }
    });
    if (e.target.id === "password")
      if (regexPassword.test(e.target.value) === false) {
        isError = true;
        var errorFormNew = this.state.errorForm;
        errorFormNew.password =
          "*Mật khẩu cần có ít nhất 6 ký tự, 1 số, 1 chữ In và 1 chữ thường và không chứa ký tự đặc biệt";
      } else {
        errorFormNew.password = "";
      }
    if (e.target.id === "password2")
      if (e.target.value !== this.state.password) {
        isError = true;
        errorFormNew.password2 = "*Bạn cần nhập mật khẩu giống trên";
      } else {
        errorFormNew.password2 = "";
      }

    if (isError) {
      this.setState({
        errorForm: errorFormNew
      });
    }

    this.setState({ [e.target.id]: e.target.value });
  };
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  async ImgToBase64(file) {
    const result = await this.toBase64(file).catch(e => e);
    if (result instanceof Error) {
      console.log("Error: ", result.message);
      return;
    }
    return result;
  }

  onSubmit = async e => {
    e.preventDefault();

    let messageError = "";

    if (this.state.password !== this.state.password2)
      messageError = "*Mật khẩu nhập lại không trùng";

    if (this.state.firstName.trim() === "")
      messageError = "*Tên không thể để trống";
    if (this.state.lastName.trim() === "")
      messageError = "*Họ không thể để trống";

    if (messageError.trim() !== "") {
      this.props.errors.message = messageError;

      this.setState({
        errors: this.props.errors
      });
      return;
    }

    const newUser = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      password: this.state.password,
      avatar: this.state.image
    };
    console.log(this.props.auth.user.data.id);
    this.setState(function(state, props) {
      return {
        isLoading: true
      };
    });
    await this.props.changeUserInfo(newUser, this.props.auth.user.data.id);
    setTimeout(() => {
      this.setState(function(state, props) {
        return {
          isLoading: false
        };
      });
    }, 0);
  };

  _checkError(val) {
    if (val !== null || val !== "") {
      return false;
    }

    return true;
  }

  render() {
    const { errors, isLoading } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={3} style={{ height: "100%" }}>
        {isLoading === true || this.props.user.isUserLoading === true ? (
          <div
            className="sweet-loading"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <HashLoader
              sizeUnit={"px"}
              size={50}
              color={"#AEA8A8"}
              loading={true}
            />
          </div>
        ) : (
          <React.Fragment>
            <Grid item xs={12} sm={5} md={5}>
              <Paper style={{ padding: 16 }}>
                <div style={{ fontWeight: "bold" }}>Thông tin cá nhân</div>{" "}
                <div>
                  Họ và tên: {this.props.user.lastname}{" "}
                  {this.props.user.firstname}
                </div>
                <div>Email: {this.props.user.email}</div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={7} md={7}>
              <Paper style={{ padding: 16 }}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                    <Typography component="h1" variant="h5"></Typography>
                    <form
                      className={classes.form}
                      noValidate
                      onSubmit={this.onSubmit}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <CssTextField
                            autoComplete="lname"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            id="lastName"
                            label="Họ"
                            value={this.state.lastName}
                            onChange={this.onChange}
                            inputProps={{ style: { fontSize: 12 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CssTextField
                            variant="outlined"
                            fullWidth
                            id="firstName"
                            label="Tên"
                            name="firstName"
                            autoComplete="fname"
                            value={this.state.firstName}
                            onChange={this.onChange}
                            inputProps={{ style: { fontSize: 12 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CssTextField
                            variant="outlined"
                            fullWidth
                            name="password"
                            label="Mật khẩu mới"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={this.state.errorForm.password.trim() !== ""}
                            helperText={this.state.errorForm.password}
                            inputProps={{ style: { fontSize: 12 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CssTextField
                            variant="outlined"
                            fullWidth
                            name="password2"
                            label="Nhập lại Mật khẩu mới"
                            type="password"
                            id="password2"
                            autoComplete="current-password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={this.state.errorForm.password2.trim() !== ""}
                            helperText={this.state.errorForm.password2}
                            inputProps={{ style: { fontSize: 12 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div>Thay đổi avatar</div>
                          <div>
                            {" "}
                            {this.state.urlPreview !== "" ? (
                              <img
                                style={{ width: 40, height: 40 }}
                                src={this.state.urlPreview}
                                alt=""
                              />
                            ) : (
                              <img
                                style={{ width: 40, height: 40 }}
                                src={this.state.avatar}
                                alt=""
                              />
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="files"
                              style={{
                                padding: "4px 6px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                background: "#2098d1",
                                color: "white",
                                boxShadow:
                                  "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
                              }}
                            >
                              Chọn ảnh
                            </label>
                            <input
                              id="files"
                              type="file"
                              onChange={this.handleChangeImage}
                              style={{ visibility: "hidden" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                      <div>
                        <div className="error_show">{errors.message}</div>
                      </div>

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Lưu thông tin
                      </Button>
                    </form>
                  </div>
                </Container>
              </Paper>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    );
  }
}
Account.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    { changeUserInfo }
  )(Account)
);
