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

const ICONS = {
  books: <ListIcon />,
  courses: <ListIcon />,
  events: <ListIcon />,
  minitasks: <ListIcon />,
  tasks: <ListIcon />,
  profile: <ListIcon />
};

const Menu = ({ resources, onMenuClick, logout }) => (
  <div>
    <Link to={`/profile`} style={{ textDecoration: "none" }}>
      <MenuItem>
        <ArrowBackIcon style={{ fontSize: 16, color: "#1f74be" }} />
        <p style={{ fontSize: 12, marginLeft: "3px", color: "#1f74be" }}>
          Quay lại trang chủ
        </p>
      </MenuItem>
    </Link>
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
