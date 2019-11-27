import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUser } from "../../../js/actions/userAction";
//import Typography from "@material-ui/core/Typography";
//import Paper from "@material-ui/core/Paper";
//import InputBase from "@material-ui/core/InputBase";
//import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Avatar from "@material-ui/core/Avatar";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import "./appbarcontent.css";
//import IconButton from "@material-ui/core/IconButton";
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
  mobileHide: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
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
        <div style={{ display: "flex", flexGrow: 1 }}>
          <div style={{ display: "flex" }}>
            {/* <Typography variant="h6" noWrap style={{ borderRadius: "30px" }}>
              {" "}
            
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
            </Typography> */}

            {this.props.user.role === "mod" ||
            this.props.user.role === "admin" ? (
              <Link
                to="/profile/minitasks/createminitask"
                style={{ textDecoration: "none",
              
              
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
              >
                <Fab
                  //className={classes.mobileHide}
                  variant="extended"
                  aria-label="like"
                  style={{
                    height: "32px",
                    fontSize: "10px",
                    background: "#dbe4f8",
                    color: "#1f74be",
                    marginLeft: 10
                  }}
                >
                  <NavigationIcon style={{ fontSize: 14, marginRight: 2 }} />
                  <div className="dangBaiTap">Đăng bài tập</div>
                </Fab>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <div
              style={{
                fontSize: 12,
                margin: "0px 4px",
                color: "#4978cc",
                marginLeft: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
              Code point: {this.props.user.codepoint}
</div>              <div>
              <EmojiNatureIcon style={{ fontSize: 24, marginRight: 1 }} />
              </div>
            </div>
            <div
              style={{
                color: "#595959",
                fontFamily: "Yanone Kaffeesatz, sans-serif",
                fontSize: "20px",

                padding: "5px"
              }}
            >
              {" "}
              <div>{this.props.user.firstname} </div>
            </div>
            <Avatar
              className={classes.mobileHide}
              style={{ width: "30px", height: "30px", marginLeft: 10 }}
              alt="Remy Sharp"
              src={this.props.user.avatar}
            />
            <UserMenu />
          </div>
        </div>
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
  connect(mapStateToProps, { getUser })(AppBarContent)
);
