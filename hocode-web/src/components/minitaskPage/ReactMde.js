import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./reactmde.css"
class ReactMde extends Component {
  handleChange = value => {
    this.props.handleMarkdownChange(value);
  };
  render() {
    return (
      <div>
        <SimpleMDEReact
          className={"react_mde_custom"}
          label=""
          value={this.props.mini_task_desc}
          onChange={this.handleChange}
          options={{
           
            spellChecker: false
            
          }}
        />
      </div>
    );
  }
}

export default ReactMde;
