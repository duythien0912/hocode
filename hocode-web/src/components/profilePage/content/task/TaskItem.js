import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";
import Tooltip from "@material-ui/core/Tooltip";
import "./taskItem.css";

const styles = {
  TaskItem: {
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "50px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 0px 0px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px"
  },
  MiniTaskItem: {
    margin: "5px",
    backgroundColor: "#dddddd",
    padding: "5px 10px",
    paddingTop: "10px",
    borderRadius: "9px",
    boxShadow:
      "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  }
};


const titleCase = string => {
  return string
    .toLowerCase()
    .split(" ")
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

class TaskItem extends Component {
  renderLevelMinitaskChip(minitask) {
    minitask.level = titleCase(minitask.level);
    if (minitask.level === "easy") {
      return (
        <Chip
          style={{ background: "#76d38e", color: "white" }}
          size="small"
          label={`${minitask.level}`}
        />
      );
    } else if (minitask.level === "medium") {
      return (
        <Chip
          style={{ background: "#1d97c6", color: "white" }}
          size="small"
          label={`${minitask.level}`}
        />
      );
    } else {
      return (
        <Chip
          style={{ background: "red", color: "white" }}
          size="small"
          label={`${minitask.level}`}
        />
      );
    }
  }
  renderMiniItem(minitask) {
    //miniItemStatus

    if (minitask.status === "hoanthanh") {
      return (
        <Link
          to={`/tasks/${minitask.id}`}
          style={{
            display: "flex",
            textDecoration: "none",
            color: "#595959",
            fontFamily: `'Yanone Kaffeesatz', sans-serif`,
            alignItems: "center"
          }}
        >
          <Tooltip title="Tên bài tập" placement="top-start">
            <div style={{ flexGrow: 1 }}> {minitask.mini_task_name}</div>
          </Tooltip>
          <Tooltip title="Code point" placement="top">
            <div
              style={{
                fontSize: 12,
                margin: "0px 4px",
                color: "#4978cc",
                marginLeft: 10,
                height: 30
              }}
              className="centerDiv"
            >
              <div>
                <p
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                    lineHeight: "30px",
                    margin: 0
                  }}
                >
                  {minitask.code_point}
                </p>
              </div>
              <div>
                <EmojiNatureIcon style={{ fontSize: 24, marginRight: 1 }} />
              </div>
            </div>
          </Tooltip>
          <Tooltip title="Độ khó" placement="top">
            <div className="level-minitask" style={{ marginLeft: 0 }}>
              {this.renderLevelMinitaskChip(minitask)}
            </div>
          </Tooltip>
          <Tooltip title="Hoàn thành" placement="top">
            <div
              style={{
                width: "20px",
                display: "flex",
                alignItems: "center",
                marginLeft: 10
              }}
            >
              <img
                style={{ width: "100%" }}
                src={require("../icons/hoanthanh.svg")}
                alt="Kiwi standing on oval"
              />
            </div>
          </Tooltip>
        </Link>
      );
    } else if (minitask.status === "chuahoanthanh" && minitask.vitri === true) {
      return (
        <a
          href="giang"
          style={{
            display: "flex",
            textDecoration: "none",
            color: "#595959",
            fontFamily: `'Yanone Kaffeesatz', sans-serif`
          }}
        >
          <div></div>
          <div style={{ flexGrow: 1 }}>{minitask.mini_task_name}</div>
          <div style={{ width: "1em" }}>
            <img
              style={{ width: "100%" }}
              src={require("../icons/user.svg")}
              alt="Kiwi standing on oval"
            />
          </div>
        </a>
      );
    } else if (
      minitask.status === "chuahoanthanh" &&
      minitask.vitri === false
    ) {
      return (
        <Link
          to={`/tasks/${minitask.id}`}
          style={{
            display: "flex",
            textDecoration: "none",
            color: "#595959",
            fontFamily: `'Yanone Kaffeesatz', sans-serif`,
            alignItems: "center"
          }}
        >
          <Tooltip title="Tên bài thực hành" placement="top-start">
            <div style={{ flexGrow: 1 }}>{minitask.mini_task_name}</div>
          </Tooltip>
          <Tooltip title="Code point" placement="top">
            <div
              style={{
                fontSize: 12,
                margin: "0px 4px",
                color: "#4978cc",
                marginLeft: 10
              }}
            >
              {minitask.code_point}
              <EmojiNatureIcon style={{ fontSize: 16, marginRight: 1 }} />
            </div>
          </Tooltip>
          <Tooltip title="Độ khó" placement="top">
            <div className="level-minitask" style={{ marginLeft: 10 }}>
              {" "}
              {this.renderLevelMinitaskChip(minitask)}
            </div>
          </Tooltip>
          <Tooltip title="Chưa hoàn thành" placement="top">
            <div
              style={{
                width: "20px",
                display: "flex",
                alignItems: "center",
                marginLeft: 10
              }}
            >
              <img
                style={{
                  width: "100%",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "50%"
                }}
                src={require("../icons/chuahoanthanh.svg")}
                alt="Kiwi standing on oval"
              />
            </div>
          </Tooltip>
        </Link>
      );
    } else if (minitask.status === "yeucaumokhoa") {
      return (
        <div
          style={{
            display: "flex",
            textDecoration: "none",
            color: "#595959",
            fontFamily: `'Yanone Kaffeesatz', sans-serif`
          }}
        >
          <div></div>
          <div style={{ flexGrow: 1 }}>{minitask.mini_task_name}</div>
          <div className="unlock" style={{ display: "flex" }}>
            <div style={{ width: "1em" }}>
              <img
                style={{ width: "100%" }}
                src={require("../icons/padlock-unlock.svg")}
                alt="Kiwi standing on oval"
              />
            </div>
            <div className="hidden" style={{ display: "none" }}>
              {minitask.point_unlock}
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    const { classes, task } = this.props;
    //console.log(task)
    return (
      <React.Fragment>
        {/*<div  
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#595959",
            fontWeight: "bold",
            fontFamily: `'Yanone Kaffeesatz', sans-serif`,
            marginBottom: "50px",
            fontSize:'2em'
          }}
        >
          Certificate  
        </div>*/}
        <Grid container direction="column" className={`${classes.TaskItem}`}>
          <Grid item container direction="column" alignItems="center">
            <Grid
              xs={6}
              md={6}
              item
              style={{
                padding: "8px",
                backgroundColor: "white",
                borderRadius: "9px",
                marginBottom: "-20px",
                zIndex: "1",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: " nowrap",
                textAlign: "center",
                width: "200px",
                boxShadow:
                  "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
              }}
            >
              {task.task_name}
              {/* tên task */}
            </Grid>
          </Grid>
          <Grid
            item
            style={{ height: "200px", width: "100%", overflow: "hidden" }}
          >
            {" "}
            {/* hình task*/}
            <img
              src={task.background_image}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "4px 4px 0 0"
              }}
              alt=""
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            style={{
              padding: "10px 0",
              background: "white",
              boxShadow:
                "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
            }}
          >
            {" "}
            {/* danh sách mini task */}
            {task.minitasks.map(minitask => (
              <Grid
                item
                className={`${classes.MiniTaskItem}`}
                key={minitask.id}
              >
                {" "}
                {this.renderMiniItem(minitask)}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TaskItem);
