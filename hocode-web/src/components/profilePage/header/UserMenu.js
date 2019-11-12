import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { logoutUser } from "../../../js/actions/authActions";
import { connect } from "react-redux";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    style={{ paddingLeft: "5px", paddingRight: "5px" }}
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    minHeight: "unset",
    "&:focus": {
      // backgroundColor: "red",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginLeft: 3 }}>
      <MoreHorizIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        style={{ color: "#282828" }}
      />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={props.logoutUser}>
          <ExitToAppIcon style={{ fontSize: 16 }} />
          <p style={{ fontSize: 12, marginLeft: "3px" }}>Đăng xuất</p>
        </StyledMenuItem>
        <StyledMenuItem>
          <AccountBoxIcon style={{ fontSize: 16 }} />
          <Link to="/profile/account" onClick={()=>{setAnchorEl(null)}}>
            <p style={{ fontSize: 12, marginLeft: "3px" }}>Thông tin cá nhân</p>
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.rootReducer.auth,
  errors: state.rootReducer.errors,
  user: state.rootReducer.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(CustomizedMenus);
