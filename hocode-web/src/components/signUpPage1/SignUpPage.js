import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";

import { connect } from "react-redux";

import { registerUser } from "../../js/actions/authActions";
import "./SignUpPage.css";

import { regexEmail, regexPassword } from "../../common/regex";

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
    marginTop: 50,
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
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://hocode-11412.web.app/">
        hocodevn.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: "", //họ
      firstName: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      errorForm: {
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        password2: ""
      }
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
    if (nextProps.errors) {
      nextProps.errors.message = "*" + nextProps.errors.message;

      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    let isError = false;
    var errorFormNew = this.state.errorForm;

    if (e.target.id === "email")
      if (regexEmail.test(e.target.value) === false) {
        isError = true;
        errorFormNew.email =
          "*Email không đúng định dạng vd: nguyenvana@gmail.com";
      } else {
        errorFormNew.email = "";
      }
    if (e.target.id === "password")
      if (regexPassword.test(e.target.value) === false) {
        isError = true;
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

  onSubmit = e => {
    e.preventDefault();

    let messageError = "";

    if (this.state.password !== this.state.password2)
      messageError = "*Mật khẩu nhập lại không trùng";
    if (this.state.password2.trim() === "")
      messageError = "*Nhập lại mật khẩu không thể để trống";
    if (this.state.password.trim() === "")
      messageError = "*Mật khẩu không thể để trống";
    // if (regexPassword.test(String(this.state.password).toLowerCase()) === false)
    //   messageError =
    //     "*Mật khẩu cần có ít nhất 6 ký tự, 1 số, 1 chữ In và 1 chữ thường và không chứa ký tự đặc biệt";

    if (this.state.email.trim() === "")
      messageError = "*Email không thể để trống";

    if (regexEmail.test(String(this.state.email).toLowerCase()) === false)
      messageError = "*Email không đúng định dạng";

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
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  };

  _checkError(val) {
    if (val !== null || val !== "") {
      return false;
    }

    return true;
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
          <Box
            justifyContent="center"
            borderBottom={24}
            color={"rgba(255, 255, 255, 0.1)"}
          >
             <div className="logo">
          <Link to="/profile">
            <img
              src={process.env.PUBLIC_URL + "/minilogo.PNG"}
              alt=""
              style={{ height: "40px" }}
            ></img>
          </Link>
        </div>
          </Box>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  autoComplete="lname"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Họ"
                  autoFocus
                  value={this.state.lastName}
                  onChange={this.onChange}
                  // error={this.state.errorForm.lastName.trim() !== ""}
                  // helperText={this.state.errorForm.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Tên"
                  name="firstName"
                  autoComplete="fname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  // error={this._checkError(this.state.errorForm.firstname)}
                  // helperText={this.state.errorForm.firstname}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ Email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={this.state.errorForm.email.trim() !== ""}
                  helperText={this.state.errorForm.email}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={this.state.errorForm.password.trim() !== ""}
                  helperText={this.state.errorForm.password}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password2"
                  label="Nhập lại Mật khẩu"
                  type="password"
                  id="password2"
                  autoComplete="current-password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={this.state.errorForm.password2.trim() !== ""}
                  helperText={this.state.errorForm.password2}
                />
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
              Tạo tài khoản
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Bạn đã có tài khoản rồi, Đăng nhập ngay
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
SignUpPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    { registerUser }
  )(SignUpPage)
);
