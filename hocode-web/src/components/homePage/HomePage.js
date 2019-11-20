import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import "./homePage.css";
const styles = {};
class CourseBody extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  render() {
    return (
      <Grid
        className="containerMain"
        style={{
          height:"inherit",
          width: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: 40,
            height:"inherit",
          }}
        >
          <Grid container>
            <Grid
              className="HeaderLeftHome"
              item
              xs={12}
              md={4}
              sm={4}
              style={{ marginBottom: 35 }}
            >
              <div className="logo">
                <Link to="/profile">
                  <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    alt=""
                    style={{ height: "40px" }}
                  ></img>
                </Link>
              </div>
            </Grid>
            <Grid
              className="HeaderRightHome"
              item
              xs={12}
              md={8}
              sm={8}
              container
            >
              <Grid item>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", marginLeft: "10px" }}
                >
                  <Button
                    style={{ background: "#4932a3", color: "white" }}
                    variant="contained"
                  >
                    Đăng nhập
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", marginLeft: "30px" }}
                >
                  <Button
                    style={{ background: "#7bccd5", color: "white" }}
                    variant="contained"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding:25
            }}
            container
          >
            <Grid item xs={12} sm={6} md={6} style={{ padding: 40 }}>
              <div>
                <h3 style={{ color: "white", textAlign: "center" }}>
                  WELLCOME TO{" "}
                  <span style={{ color: "#009688", fontSize: "1.5em" }}>
                    HOCODE
                  </span>
                </h3>
              </div>
              <div>
                <p style={{ color: "white", textAlign: "center" }}>
                  Học và rèn luyện khả năng lập trình. Là môt nhà tiên phong trong việc giáo dục trực tuyến chúng tôi đã có hơn 45 triệu người dùng thông qua bản thử nghiệm. Còn chần chờ gì nữa, hãy tham gia ngay.  
                </p>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <img
                src={process.env.PUBLIC_URL + "/codeEdit.PNG"}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",

                  boxShadow: "9px 7px 40px 0px rgba(0,0,0,0.75)",
                  borderRadius: 14
                }}
              ></img>
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth
});
export default withStyles(styles)(connect(mapStateToProps, {})(CourseBody));
