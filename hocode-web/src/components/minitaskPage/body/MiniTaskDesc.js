import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "./minitaskdesc.css";
const styles = {
  DescContainer: {
    background: "#ffffff",
    position: "relative",
    overflowY: "scroll",
    height: "100%",
    overflowX: "hidden",
    borderRadius: "4px",
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
    padding: "10px 10px"
  }
};
class MiniTaskDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MiniTaskDesc: ""
    };
  }
  componentDidMount() {
    axios.get(`/minitaskdesc/`).then(res => {
      const MiniTaskDesc = res.data[0].desc;
      this.setState({ MiniTaskDesc });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.DescContainer}>
        <div>
          <div>300</div>
        </div>
        <div className="md_desc" style={{ padding: "16px" }}>
          <ReactMarkdown
            escapeHtml={false}
            source={this.state.MiniTaskDesc}
            renderers={{
              linkReference: reference => {
                if (!reference.href) {
                 
                  return `[${reference.children[0].props.children}]`;
                }
                return <a href={reference.$ref}>{reference.children}</a>;
              },
              heading: props => {
                return <p className="md_heading">{props.children}</p>;
              },
              inlineCode: props => {
                return <code className="md_code">{props.children}</code>;
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MiniTaskDesc);