import React from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
const styles = {
  paper: {
    padding: 16
  }
};

class Overview extends React.Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5} md={5}>
          <Paper className={classes.paper}>
            <Grid container style={{ marginBottom: 15 }}>
              <Grid item style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: "bold" }}>Kết quả học tập</div>{" "}
              </Grid>
              <Grid item>
                <div style={{ fontSize: 12, color: "#4978cc" }}>
                  Code point:{" "}
                  <EmojiNatureIcon style={{ fontSize: 16, marginRight: 1 }} />
                  31242
                </div>
              </Grid>
            </Grid>

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
                  src="https://loremflickr.com/320/240"
                />
              </Grid>
              <Grid item style={{ flexGrow: 1, padding: 10 }}>
                <div style={{ fontWeight: "bold" }}>Tên khóa học</div>
                <div style={{ color: "#9d9d9d" }}>2/10</div>
              </Grid>
              <Grid item>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  style={{ width: 115 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <Paper className={classes.paper}>
            <div style={{ fontWeight: "bold" }}>Sự kiện nổi bật</div>{" "}
            <Grid
              style={{
                border: "1px solid #0000001f",
                borderRadius: "4px",
                marginTop: 10,
                marginBottom: 10
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "40px",
                  objectFit: "cover"
                }}
                alt="complex"
                src="https://loremflickr.com/320/240"
              />
              <Grid
                container
                direction="column"
                style={{ alignItems: "center" }}
              >
                <Grid item>Tên sự kiện</Grid>
                <Grid item> mô tả</Grid>
              </Grid>
            </Grid>
            <Divider style={{ width: 100, margin: "auto" }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={classes.paper}>
            <div style={{ fontWeight: "bold" }}>Sách đề xuất</div>{" "}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <Grid
                  style={{
                    border: "1px solid #0000001f",
                    borderRadius: "4px",
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100",
                      objectFit: "cover"
                    }}
                    alt="complex"
                    src="https://loremflickr.com/320/240"
                  />
                  <Grid
                    container
                    direction="column"
                    style={{ alignItems: "center" }}
                  >
                    <Grid item>Tên sách</Grid>
                    <Grid item> mô tả</Grid>
                  </Grid>
                </Grid>
              </Grid> {/*end list sach */}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(Overview)
);
