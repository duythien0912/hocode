import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import { getUser } from "../../../js/actions/userAction";
import axios from "axios";
import { Link } from "react-router-dom";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAlt";
const styles = theme => ({
  userinfo: {
    marginBottom: 15,
    flexWrap: "unset",
    alignItems: "center",
    color: "#4978CC"
  },
  dailychallenge: {
    marginBottom: 15,
    flexWrap: "unset"
  }
});
class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { daily_minitask: {}, isLoading: true };
  }
  getApi = async () => {
    await Promise.all([
      axios.get(`https://hocodevn.com/api/v1/dailyminitask`).then(res => {
        const daily_minitasks = res.data;
        console.log(daily_minitasks);
        this.setState({ daily_minitasks: daily_minitasks });
      })
    ]);
    this.setState({ isLoading: false });
  };
  componentDidMount() {
    this.props.getUser();
    this.getApi();
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.userinfo}>
          <Grid item>
            <SentimentSatisfiedAltIcon
              style={{ fontSize: 30, marginRight: 4 }}
            />
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <div >
              Xin chào {this.props.user.firstname} !!!{" "}
            </div>{" "}
          </Grid>
        </Grid>
        <Divider light />
        <div
          style={{ margin: "50px 0 10px 0", fontSize: "15px", fontWeight: 600 }}
        >
          Thách thức hằng ngày
        </div>
        {this.state.isLoading ? (
          <div>loading</div>
        ) : (
          <React.Fragment>
            {this.state.daily_minitasks.map(daily_minitask => {
              return (
                <Grid container className={classes.dailychallenge} key={daily_minitask.id} >
                  
                  
                  <Grid item>
                    {daily_minitask.avatar === undefined?<img
                      alt="Remy Sharp"
                      src="https://loremflickr.com/320/240"
                      style={{ width: "50px", height: "50px" }}
                    />:<img
                    alt="Remy Sharp"
                    src={daily_minitask.avatar}
                    style={{ width: "50px", height: "50px" }}
                  />}
                   
                  </Grid>
                  <Grid item style={{ flexGrow: 1 }}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        margin: "0 10px"
                      }}
                    >
                      <Link to={`/tasks/${daily_minitask.id}`} style={{textDecoration:'none'}}> {daily_minitask.mini_task_name}</Link>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#a2a8b1",
                        margin: "0 10px"
                      }}
                    >
                     Code Point: {daily_minitask.code_point}
                    </div>
                  </Grid>
                </Grid>
              );
            })}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { getUser }
  )(NavRight)
);
