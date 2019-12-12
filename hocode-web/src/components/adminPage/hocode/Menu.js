/**
 * Generated Menu.js code. Edit at own risk.
 * When regenerated the changes will be lost.
 **/
import React from "react";
import { connect } from "react-redux";
import { MenuItemLink, getResources, Responsive } from "react-admin";
import ListIcon from "@material-ui/icons/ViewList";
import { titleCase } from "./utils";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EventIcon from '@material-ui/icons/Event';
import GestureIcon from '@material-ui/icons/Gesture';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const ICONS = {
  books: <MenuBookIcon style={{marginRight: 1}} />,
  events: <EventIcon style={{marginRight: 1}} />,
  courses: <GestureIcon style={{marginRight: 1}} />,
  tasks: <SportsSoccerIcon style={{marginRight: 1}} />,
  minitasks: <SportsVolleyballIcon style={{marginRight: 1}} />,
  profile: <ListIcon style={{marginRight: 1}} />,
  certs: <CardGiftcardIcon style={{marginRight: 1}} />,
  users: <SupervisorAccountIcon style={{marginRight: 1}} />,
};

const Menu = ({ resources, onMenuClick, logout }) => (
  <div>
    <Link to={`/profile`} style={{ textDecoration: "none" }}>
      <MenuItem>
        <ArrowBackIcon style={{ fontSize: 23, color: "#1f74be" }} />
        <p style={{ fontSize: 14, marginLeft: "1.2em", color: "#1f74be" }}>
          Quay lại trang chủ
        </p>
      </MenuItem> 
      
    </Link>
    {/* <MenuItemLink
              key="goHome"
              to={`/profile`}
              primaryText={`Quay lại trang chủ`}
              onClick={onMenuClick}
              leftIcon={<ArrowBackIcon/>}
              className="MenuItemLinkBack"
            /> */}
    {resources
      ? resources.map(resource =>
          resource.hasList ? (
            <MenuItemLink
              key={resource.name}
              to={`/${resource.name}`}
              primaryText={`${changeIDToName(titleCase(resource.name))}`}
              onClick={onMenuClick}
              leftIcon={ICONS[resource.name]}
            />
          ) : null
        )
      : ""}
    <Responsive small={logout} medium={null} />
  </div>
);

const changeIDToName = name => {
  var title = "";
  switch (name) {
    case "Books":
      title = "Sách lập trình";
      break;
    case "Events":
      title = "Sự kiện";
      break;
    case "Courses":
      title = "Chủ đề";
      break;
    case "Tasks":
      title = "Chủ đề con";
      break;
    case "Minitasks":
      title = "Bài học";
      break;
    case "Certs":
      title = "Chứng chỉ";
      break;
    case "Users":
      title = "Người dùng";
      break;
    default:
      title = name;
      break;
  }

  return title;
};

const mapStateToProps = state => ({
  resources: getResources(state)
});

export default connect(mapStateToProps)(Menu);
/** End of Generated Menu.js Code **/
