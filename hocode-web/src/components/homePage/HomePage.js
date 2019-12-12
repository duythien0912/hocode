import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./homePage.css";

const styles = {
  cardGrid: {
    paddingTop: 32,
    paddingBottom: 32
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to={"/"}>
        Hocodevn.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const cards = [1, 2, 3];

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
    // const { classes } = this.props;

    return (
      <Grid
        className="containerMain"
        style={{
          height: "inherit",
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
            paddingTop: 0,
            height: "inherit"
          }}
        >
          <Grid container className="header-homepage">
            <Grid
              className="HeaderLeftHome"
              item
              xs={12}
              md={4}
              sm={4}
              style={{ marginBottom: 0 }}
            >
              <div className="logo logo-homepage">
                <Link to="/profile">
                  <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    alt=""
                    style={{ height: "80px", paddingTop: 35 }}
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
                  to="/searchcert"
                  style={{ textDecoration: "none", marginLeft: "30px" }}
                >
                  <Button
                    style={{
                      background: "#2b2b2b",
                      color: "white",
                      fontWeight: 600,
                      boxShadow: "none",
                      fontSize: "16px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                  
                      // width: "155px",
                    }}
                    startIcon={<SearchIcon />}
                    variant="contained"
                  >
                    Tra Chứng Chỉ
                  </Button>
                </Link>
              </Grid>

              <Grid item>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", marginLeft: "30px" }}
                >
                  <Button
                    style={{
                      background: "#2196f3",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      boxShadow: "none",
                      width: "125px"
                    }}
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
                    style={{
                      background: "#7bccd5",
                      color: "white",
                      fontWeight: 600,
                      boxShadow: "none",
                      fontSize: "16px",
                      width: "125px"
                    }}
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
              // justifyContent: "center",
              // alignItems: "center",
              padding: 10,
              marginBottom: "30px"
            }}
            container
          >
            <Grid
              className="left-block-homepage"
              item
              xs={12}
              sm={6}
              md={6}
              style={{}}
            >
              <div>
                {/* <h3 style={{ textAlign: "center" }}> */}
                <Typography
                  component="h1"
                  variant="h2"
                  // align="left"
                  color="textPrimary"
                  gutterBottom
                  style={{ color: "#009688", fontWeight: 600, fontSize: "4em" }}
                >
                  {/* WELLCOME TO{" "} */}
                  {/* <span style={{ color: "#009688",  }}> */}
                  WELLCOME TO HOCODE
                  {/* </span> */}
                </Typography>

                {/* </h3> */}
              </div>
              <div>
                <Typography
                  variant="h5"
                  // align="left"
                  color="textSecondary"
                  paragraph
                >
                  {/* <p style={{ textAlign: "center" }}> */}
                  Học và rèn luyện khả năng lập trình với hơn{" "}
                  <span className="span-red MuiTypography-h5">30</span> bài thực hành{" "}
                  <span className="span-red MuiTypography-h5">JAVA</span>. Còn
                  chần chờ gì nữa, hãy tham gia ngay.
                  {/* </p> */}
                </Typography>

                <Grid
                  container
                  spacing={2}
                  className="left-block-home-button"
                  // justify="left"
                >
                  <Grid item>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          color: "#fff",
                          background: "#ff5252",

                          fontWeight: 600,
                          boxShadow: "none",
                          fontSize: "16px",
                          padding: "8px 32px"
                        }}
                      >
                        Bắt đầu
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid
              className="image-homepage"
              container
              item
              xs={12}
              sm={6}
              md={6}
              style={{
                padding: "8px"
              }}
            >
              <div
                style={{
                  background: `url("/codeEdit3.jpg") no-repeat left center`,
                  backgroundSize: "cover",
                  width: "100%",
                  display: "flex",
                  borderRadius: "16px 4px"
                }}
              ></div>
              {/* <img
              src={process.env.PUBLIC_URL  + "/codeEdit3.jpg"}
              alt=""
              // style={{ height: "40px" }}
            ></img>
    <Grid item>Goes here</Grid> */}
            </Grid>
          </Grid>

          {/* <Grid 
                      style={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 25
                      }}
           
          
          >
              <img
                src={process.env.PUBLIC_URL + "/codeEdit.PNG"}
                alt=""
                style={{
                  width: "30%",
                  height: "auto",

                  boxShadow: "9px 7px 40px 0px rgba(0,0,0,0.75)",
                  borderRadius: 14
                }}
              ></img>
            </Grid> */}

          <Copyright />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth
});
export default withStyles(styles)(connect(mapStateToProps, {})(CourseBody));

// <Container className={classes.cardGrid} maxWidth="md">
// {/* End hero unit */}
// <Grid container spacing={4}>
//   {cards.map(card => (
//     <Grid item key={card} xs={12} sm={6} md={4}>
//       <Card className={classes.card}>
//         <CardMedia
//           className={classes.cardMedia}
//           image="https://source.unsplash.com/random"
//           title="Image title"
//         />
//         <CardContent className={classes.cardContent}>
//           <Typography gutterBottom variant="h5" component="h2">
//             Heading
//           </Typography>
//           <Typography>
//             This is a media card. You can use this section to
//             describe the content.
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   ))}
// </Grid>
// </Container>
