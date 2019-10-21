import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";

import { connect } from "react-redux";
import { loginUser } from "../../js/actions/authActions";

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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
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
            Đăng nhập
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <div>
              <div className="error_show">{errors.message}</div>
            </div>
            
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
              autoComplete="email"
              autoFocus
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
              value={this.state.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lưu tài khoản"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên tài khoản
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Bạn chưa có tài khoản, Đăng ký ngay"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    { loginUser }
  )(LoginPage)
);
