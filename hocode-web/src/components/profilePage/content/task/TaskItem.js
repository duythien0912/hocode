import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import "./taskItem.css";

const styles = {
  TaskItem: {
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "50px",
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 0px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px'

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
class TaskItem extends Component {
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
            fontFamily: `'Yanone Kaffeesatz', sans-serif`
          }}
        >
          <div></div>
          <div style={{ flexGrow: 1 }}>{minitask.mini_task_name}</div>
          <div style={{ width: "1em" }}>
            <img
              style={{ width: "100%" }}
              src={require("../icons/hoanthanh.svg")}
              alt="Kiwi standing on oval"
            />
          </div>
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
            fontFamily: `'Yanone Kaffeesatz', sans-serif`
          }}
        >
          <div></div>
          <div style={{ flexGrow: 1 }}>{minitask.mini_task_name}</div>
          <div style={{ width: "1em" }}>
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
                fontFamily: `'Yanone Kaffeesatz', sans-serif`,
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
