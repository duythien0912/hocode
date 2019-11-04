import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUser } from "../../../js/actions/userAction";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import UserMenu from "./UserMenu";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import IconButton from "@material-ui/core/IconButton";
const styles = theme => ({
  searchComponent: {
    padding: "2px 15px 2px 4px",
    display: "flex",
    alignItems: "center",
    background: "#ebebeb",
    height: "35px",
    borderRadius: "unset!important"
  },
  inputSearchComponent: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 12
  },
  iconButtonSearchComponent: {
    padding: 10
  },
  mobileHide:{
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
  }
});
class AppBarContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div style={{ display: "flex", flexGrow:1}}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" noWrap style={{ borderRadius: "30px" }}>
              {" "}
              {/* search component */}
              <Paper className={classes.searchComponent}>
                <InputBase
                  className={classes.inputSearchComponent}
                  placeholder="Tìm kiếm khóa học,..."
                  inputProps={{ "aria-label": "search google maps" }}
                />
                <IconButton
                  className={classes.iconButtonSearchComponent}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Typography>
            <Fab 
              className={classes.mobileHide}
              variant="extended"
              aria-label="like"
              style={{
                height: "32px",
                fontSize: 12,
                background: "#dbe4f8",
                color: "#1f74be"
              }}
            >
              <NavigationIcon style={{ fontSize: 16, marginRight: 2 }} />
              Đăng bài tập
            </Fab>
            
          </div>
          <div
            style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <div style={{ fontSize: 12, margin: "0px 4px", color: "#4978cc" }}>
              <EmojiNatureIcon style={{ fontSize: 16, marginRight: 1 }} />
              31242
            </div>

            <Avatar
             className={classes.mobileHide}
              style={{ width: "30px", height: "30px" }}
              alt="Remy Sharp"
              src="https://loremflickr.com/320/240"
             
            />
            <UserMenu />
          </div>
        </div>
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
  )(AppBarContent)
);
