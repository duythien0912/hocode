import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppsIcon from "@material-ui/icons/Apps";
//import ReactAdmin from "../adminPage/hocode/ReactAdmin";
import BallotIcon from "@material-ui/icons/Ballot";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import React from "react";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import { logoutUser } from "../../js/actions/authActions";
import Account from "./content/account/Account";
import CourseBody from "./content/course/CourseBody1";
import CreateMiniTask from "./content/minitask/CreateMiniTaskBody";
//import MinitaskEdit from "./content/minitask/MinitaskEdit";
import Overview from "./content/overview/Overview";
import PrintBody from "./content/print/PrintBody";
import TaskBody from "./content/task/TaskBody";
import AppBarContent from "./header/AppBarContent";
import NavRight from "./navRight/NavRight";
import "./profilepage.css";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex",
    background:"#fff"
  },
  drawerMain: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  navRight: {
    top: "65px",
    order: 2,
    width: "225px",
    height: "calc(100vh - 65px)",
    display: "none",
    padding: "16px 32px",
    position: "relative", // sticky
    // marginTop: "65px",
    overflow:"hidden",
    flexShrink: 0,
    [theme.breakpoints.up("md")]: {
      display: "block"
    },
    background: "white"
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    background: "#fff",
    boxShadow: "unset!important",
    borderBottom: "1px solid rgba(76, 87, 102, .1)"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    borderRadius: "unser !important"
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: "#f3f3f3"
  },
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
  }
});
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      mobileOpen: false,
      menu: 1
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  onClickMenuItem(menu) {
    return e => {
      this.setState({
        menu: menu
      });
    };
  }
  onLogout = e => {
    e.preventDefault();
    console.log(this.props);
    this.props.logoutUser();
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    const { classes, theme, container } = this.props;
    const { mobileOpen } = this.state;
    let { path, url } = this.props.match;
    console.log("[path]");
    console.log(path);
    const {
      location: { pathname }
    } = this.props;

    const drawer = (
      <div style={{ height: "100%", overflow: "hidden" }}>
        <div
          className={classes.toolbar}
          style={{
            borderBottom: "1px solid rgba(76, 87, 102, .1)",
            minHeight: 65,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
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
        </div>

        <MenuList className="menuLeftDrawer" style={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            // justify="center"
            // alignItems="center"
            style={{ height: "100%" }}
          >
            <Link to={`${url}/overview`}>
              <MenuItem
                selected={pathname === `${url}/overview` || pathname === `${url}` || pathname === `${url}/`}
                onClick={this.onClickMenuItem(1)}
              >
                <AppsIcon style={{ fontSize: 16 }} />
                <p style={{ fontSize: 14, marginLeft: "8px" }}>Trang chủ</p>
              </MenuItem>
            </Link>

            <Link to={`${url}/course`}>
              <MenuItem
                selected={pathname === `${url}/course`}
                onClick={this.onClickMenuItem(1)}
              >
                <ImportContactsIcon style={{ fontSize: 16 }} />
                <p style={{ fontSize: 14, marginLeft: "8px" }}>Chủ đề</p>
              </MenuItem>
            </Link>

            <Link to={`${url}/print`}>
              <MenuItem
                selected={pathname === `${url}/print`}
                onClick={this.onClickMenuItem(1)}
              >
                <CardMembershipIcon style={{ fontSize: 16 }} />
                <p style={{ fontSize: 14, marginLeft: "8px" }}>
                  Nhật ký luyện tập
                </p>
              </MenuItem>
            </Link>
            {this.props.user.role === "mod" ||
            this.props.user.role === "admin" ? (
              <Link to={`/admin`}>
                <MenuItem
                  selected={pathname === `${url}/admin`}
                  onClick={this.onClickMenuItem(1)}
                >
                  <BallotIcon style={{ fontSize: 16 }} />
                  <p style={{ fontSize: 14, marginLeft: "8px" }}>Quản lý</p>
                </MenuItem>
              </Link>
            ) : (
              ""
            )}

            {/* <Link to={`${url}/account`}>
            <MenuItem
              selected={pathname === `${url}/account`}
              onClick={this.onClickMenuItem(1)}
            >
              <AccountBoxIcon style={{ fontSize: 16 }} />
              <p style={{ fontSize: 14, marginLeft: "3px" }}>Thông tin cá nhân</p>
            </MenuItem>
          </Link> */}

            <Grid
              item
              xs
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                marginBottom: "65px"
              }}
            >
              <Link to={`${url}/account`}>
                <MenuItem
                  selected={pathname === `${url}/account`}
                  onClick={this.onLogout}
                >
                  <PowerSettingsNewIcon style={{ fontSize: 16 }} />
                  <p style={{ fontSize: 14, marginLeft: "8px" }}>Đăng xuất</p>
                </MenuItem>
              </Link>{" "}
            </Grid>
          </Grid>
        </MenuList>
      </div>
    );
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <AppBarContent />
          </Toolbar>
        </AppBar>
        <nav
          className={` ${classes.drawerMain} drawerMain `}
          aria-label="nav main"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <nav className={classes.navRight} aria-label="nav right">
          <NavRight />
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path={path}>
              <Overview url={url} />
            </Route>
            <Route path={`${path}/overview`}>
              <Overview url={url} />
            </Route>
            <Route path={`${path}/course`}>
              <CourseBody url={url} />
            </Route>
            <Route path={`${path}/courses/:courseId/tasks`}>
              <TaskBody location={this.props.location} />
            </Route>
            <Route path={`${path}/print`}>
              <PrintBody  userData={this.props.user}/>
            </Route>
            {/* <Route path={`${path}/admin`}>
              <ReactAdmin />
            </Route> */}
            <Route path={`${path}/account`}>
              <Account />
            </Route>
            <Route exact path={`${path}/minitasks/createminitask`}>
              <Paper style={{ padding: 10 }}>
                <CreateMiniTask location={this.props.location} />
              </Paper>
            </Route>
            {/* <Route exact path={`${path}/minitasks/:minitasksId/edit`}>
              <Paper style={{ padding: 10 }}>
                <MinitaskEdit location={this.props.location} />
              </Paper>
            </Route> */}
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, { logoutUser })(ProfilePage)
);
