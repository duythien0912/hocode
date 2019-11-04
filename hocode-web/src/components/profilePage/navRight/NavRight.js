import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
import { getUser } from "../../../js/actions/userAction";
const styles = theme => ({
  userinfo: {
    marginBottom:15,
    flexWrap: "unset",
    alignItems: "center"
  },
  dailychallenge:{
    
    marginBottom:15,
    flexWrap: "unset",
   
  }
});
class NavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getUser();
    
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.userinfo}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="https://loremflickr.com/320/240"
              className={classes.avatar}
            />
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <div
              style={{ fontSize: "15px", fontWeight: 600, margin: "0 10px" }}
            >
              {this.props.user.firstname}
            </div>
            <div
              style={{ fontSize: "12px", color: "#a2a8b1", margin: "0 10px" }}
            >
              Trưởng ban đam mê lập trình
            </div>
          </Grid>
        </Grid>
        <Divider light />
        <div style={{margin:"50px 0 10px 0",fontSize: "15px", fontWeight: 600}}>Thách thức hằng ngày</div>
        <Grid container className={classes.dailychallenge}>
          <Grid item>
            <img alt="Remy Sharp"
              src="https://loremflickr.com/320/240"
              style={{width:'50px',height:'50px'}}/>
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <div
              style={{ fontSize: "15px", fontWeight: 600, margin: "0 10px" }}
            >
              Tên minitask
            </div>
            <div
              style={{ fontSize: "12px", color: "#a2a8b1", margin: "0 10px" }}
            >
              codepoint
            </div>
          </Grid>
        </Grid>
        <Grid container className={classes.dailychallenge}>
          <Grid item>
            <img alt="Remy Sharp"
              src="https://loremflickr.com/320/240"
              style={{width:'50px',height:'50px'}}/>
          </Grid>
          <Grid item style={{ flexGrow: 1 }}>
            <div
              style={{ fontSize: "15px", fontWeight: 600, margin: "0 10px" }}
            >
              Tên minitask
            </div>
            <div
              style={{ fontSize: "12px", color: "#a2a8b1", margin: "0 10px" }}
            >
              codepoint
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { getUser }
  )(NavRight)
);
