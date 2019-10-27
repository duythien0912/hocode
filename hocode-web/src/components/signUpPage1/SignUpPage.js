import React from 'react';
import PropTypes from "prop-types";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/styles";

import { connect } from "react-redux";
import { registerUser } from "../../js/actions/authActions";

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
      lastName:"", //họ
      firstName:"",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/courses");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/courses");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      lastName:this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);

  };
  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
          <div>
              <div className="error_show">{errors.message}</div>
              
            </div>
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
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <CssTextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Nhập lại Password"
                type="password"
                id="password2"
                autoComplete="current-password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
            </Grid>
           
          </Grid>
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
  auth: state.auth,
  errors: state.errors
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    { registerUser }
  )(SignUpPage)
);
