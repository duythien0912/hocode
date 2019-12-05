import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Certificate from "./Certificate";
import ReactToPrint from "react-to-print";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

const styles = {};

class PrintBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minitasks: [],
      openDialogCertificate: false,
      isLoading: true,
      certificate: {},
      review_point: 0,
      user_codepoint: 0,
      isLoadingCert: false
    };
  }

  getApi = async () => {
    await Promise.all([
      axios
        .get(`https://hocodevn.com/api/v1/curd/configs/byname/hocode`)
        .then(res => {
          console.log(res.data);
          const certificateConfig = res.data;

          this.setState({ review_point: certificateConfig.review_point });
        }),
      axios.get("https://hocodevn.com/auth/userinfo").then(res => {
        console.log(res.data);
        this.setState({ user_codepoint: res.data.codepoint });
      }),
      axios.get(`https://hocodevn.com/auth/completeminitask`).then(res => {
        const minitasks = res.data;
        console.log(minitasks);
        this.setState({ minitasks });
      })
    ]);
    this.setState({ isLoading: false });
  };
  componentDidMount() {
    this.getApi();
  }
  getCertificate = async () => {
    this.setState({
      openDialogCertificate: true
    });
    this.setState({ isLoadingCert: true });
    await Promise.all([
      axios.get(`https://hocodevn.com/api/v1/auth/reviewcert`).then(res => {
        const certificate = res.data;
        console.log(res.data);
        this.setState({ certificate });
        this.setState({ isLoadingCert: false });
      })
    ]);
  };
  handleDialogCertificateOpen = () => {
    this.getCertificate();
  };

  handleDialogCertificateClose = () => {
    this.setState({ openDialogCertificate: false });
  };

  renderDialog = (certificate) =>{
    if(certificate.cert !== undefined){
     if(certificate.cert.status === "Inactive"){
       return (
        <DialogContent dividers>
        <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        style={{ marginLeft: 4, textAlign: "center" }}
      >
        Bạn sẽ nhận được chứng chỉ nếu số đậu của bạn lớn hơn{" "}
        {this.state.review_point}
      </Typography>
      </DialogContent>
       )
     }
     else{
       return(      <>

        <DialogContent dividers>
          
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Certificate
                ref={el => (this.CertificateRef = el)}
                Certificate={this.state.certificate}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.handleDialogCertificateClose}
        >
          <Grid
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ReactToPrint
              trigger={() => (
                <Button
                  style={{ background: "#1ECD97", color: "#fff" }}
                  variant="contained"
                >
                  In chứng chỉ
                </Button>
              )}
              content={() => this.CertificateRef}
            />
          </Grid>
        </DialogTitle>
      </>)
     }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.isLoading ? (
          <div
            className="sweet-loading"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100vh"
            }}
          >
            <HashLoader
              sizeUnit={"px"}
              size={50}
              color={"#AEA8A8"}
              loading={this.state.isLoading}
            />
          </div>
        ) : (
          <Grid
            container
            spacing={2}
            style={{ height: "100%", maxHeight: 400 }}
          >
            <Grid item xs={12} sm={4} md={4}>
              <Paper
                style={{
                  height: "100%",
                  padding: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Grid container direction="column" alignItems="center">
                  <Grid item container style={{ justifyContent: "center" }}>
                    <Grid
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%"
                        }}
                        alt="avatar"
                        src={this.props.user.avatar}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ color: "#4978cc" }}
                    >
                      {this.props.user.lastname} {this.props.user.firstname}
                    </Typography>
                  </Grid>
                  <Grid item style={{ textAlign: "center" }}>
                    <Typography variant="h5" style={{ color: "#4978cc" }}>
                      {this.props.user.codepoint}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ marginLeft: 4, color: "#4978cc" }}
                    >
                      {/* {course.total_minitask} */}
                      Điểm tích lũy
                    </Typography>
                  </Grid>

                  <Grid item style={{ textAlign: "center", marginTop:"20px" }}>
                    <Typography variant="h5" style={{ color: "#4978cc" }}>
                      {this.state.minitasks.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ marginLeft: 4, color: "#4978cc" }}
                    >
                      {/* {course.total_minitask} */}
                      Bài tập đã hoàn thành
                    </Typography>
                  </Grid>

                  <Grid item style={{ textAlign: "center", marginTop:"20px" }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{ marginLeft: 4, textAlign: "center" }}
                    >
                      Bạn sẽ nhận được chứng chỉ nếu số đậu của bạn lớn hơn{" "}
                      {this.state.review_point}
                    </Typography>
                  </Grid>

                  <Grid item style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      style={{ background: "#1ECD97", color: "#fff" }}
                      onClick={this.handleDialogCertificateOpen}
                    >
                      Xét chứng chỉ
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <Paper
                style={{
                  minHeight: 400,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Grid container style={{ padding: 10 }}>
                  <Grid item style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: "bold" }}>
                      Danh sách bài tập đã hoàn thành
                    </div>{""}
                  </Grid>
                </Grid>
                <Grid container style={{ padding: 30 }}>
                  {this.state.minitasks.length !== 0 ? (
                    this.state.minitasks.map(minitask => {
                      return (
                        <React.Fragment key={minitask.id}>
                          <Grid container style={{ alignItems: "center" }}>
                            <Grid item>
                              <img
                                className={classes.img}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "8px"
                                }}
                                alt="complex"
                                src={minitask.avatar}
                              />
                            </Grid>
                            <Grid item style={{ flexGrow: 1, padding: 10 }}>
                              <div style={{ fontWeight: "bold" }}>
                                <Link
                                  className="item"
                                  style={{ textDecoration: "none" }}
                                  to={`/tasks/${minitask.id}`}
                                >
                                  {minitask.mini_task_name}
                                </Link>
                              </div>
                              <div style={{ color: "#9d9d9d" }}>
                                Code Point: {minitask.code_point}
                              </div>
                            </Grid>
                          </Grid>
                          <Divider style={{ margin: "auto", width: "100%" }} />{" "}
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      style={{ flexGrow: 1 }}
                    >
                      <Grid item>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ marginLeft: 4 }}
                        >
                          Bạn chưa hoàn thành bài tập nào.
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
            <Dialog
              maxWidth={false}
              open={this.state.openDialogCertificate}
              onClose={this.handleDialogCertificateClose}
              aria-labelledby="customized-dialog-title"
            >
              {" "}
              {this.state.isLoadingCert === true ? (
                <div
                  className="sweet-loading"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden"
                  }}
                >
                  <HashLoader
                    sizeUnit={"px"}
                    size={50}
                    color={"#AEA8A8"}
                    loading={this.state.isLoadingCert}
                  />
                </div>
              ) : ( 
                
                this.renderDialog(this.state.certificate)
              )}
            </Dialog>
          </Grid>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, {})(PrintBody)
);
