import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ReactMarkdown from "react-markdown";
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


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.DescContainer}>
        <div style={{fontFamily:` "Share Tech Mono", monospace `,display:'flex',color:'#44BFA3',wordSpacing:'-8px'}}>
        <div style={{flexGrow:1,marginRight:10}}>Độ khó: {this.props.level}</div>
          <div style={{marginRight:'10px'}}>{this.props.code_point}</div>
          
        </div>
        <div className="md_desc" style={{ padding: "16px" }}> {/* minitask description */}
          <ReactMarkdown 
            escapeHtml={false}
            source={this.props.mini_task_desc} 
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
