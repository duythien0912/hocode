import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { loginUser } from "../../js/actions/authActions";

import "./LoginPage.css";

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
      <Link color="inherit" to="/">
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
      remember: true,
      isLoading: false,
      errors: {}
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
    this.setState({ [e.target.id]: e.target.value });
  };
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  onSubmitTest = e => {
    this.setState({
      email: "thiennd@gmail.com",
      password: "Thien123"
    });
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      remember: this.state.remember
    };

    var loginF = Promise.all([this.props.loginUser(userData)]);

    loginF.then(val => {
      this.setState({ isLoading: false });
    });
  };
  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box
            justifyContent="center"
            borderBottom={24}
            color={"rgba(255, 255, 255, 0.1)"}
          >
            <div className="logo">
              <Link to="/profile">
                <img
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  alt=""
                  style={{ height: "80px" }}
                ></img>
              </Link>
            </div>
          </Box>

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
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      onChange={this.handleChange("remember")}
                      checked={this.state.remember}
                    />
                  }
                  label="Lưu tài khoản"
                />
              </Grid>
              {/* <Button variant="contained" onClick={this.onSubmitTest}>
                Tài khoản admin test
              </Button> */}
              {/* <Button variant="contained" onClick={this.onSubmitTest}>
                Tài khoản mod test
              </Button> */}
            </Grid>

            {/* <Button fullWidth variant="contained" onClick={this.onSubmitTest}>
              Tài khoản admin test
            </Button> */}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {this.state.isLoading ? (
                <CircularProgress
                  size={22}
                  color="#fff"
                  style={{ margin: 2 }}
                />
              ) : (
                "Đăng nhập"
              )}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2">
                  {/* Quên tài khoản */}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body1">
                  {"Nếu bạn chưa có tài khoản, Hãy đăng ký ngay"}
                </Link>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Link to="#" variant="body2"></Link>
              </Grid>

              <Grid item>
                <Typography variant="subtitle1">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScGsL9g_Hot55sUbVHb0O7uBsWtkBrDE65fmETvflcxvuCdvw/viewform?usp=sf_link"
                    // variant="subtitle1"
                    target="_blank"
                    rel="noopener noreferrer"
                    // ref={element => {
                    //   if (element)
                    //     element.style.setProperty(
                    //       "color",
                    //       "#ff5722",
                    //       "important"
                    //     );
                    // }}
                    style={{
                      textDecoration: "none",
                      color: "#ff5722!important"
                    }}
                  >
                    Đăng ký trở thành giáo viên
                  </a>
                </Typography>
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
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors
});
export default withStyles(styles)(
  connect(mapStateToProps, { loginUser })(LoginPage)
);
