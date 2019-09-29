
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import './codeeditor.css';
import "codemirror/addon/hint/show-hint.css";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";


import "codemirror/mode/clike/clike.js"
import "codemirror/mode/javascript/javascript.js"
import "codemirror/addon/edit/closebrackets.js"
import "codemirror/addon/edit/closetag.js"
import "codemirror/addon/edit/matchbrackets.js"
import "codemirror/addon/hint/anyword-hint.js"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/hint/javascript-hint.js"
import "codemirror/addon/hint/css-hint.js"






class CodeEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      userCode:''
    }

  }

  render() {
    return (
      <CodeMirror
      value={
        this.state.userCode
      }
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
          highlightSelectionMatches: true,
          indentUnit: 4,
          tabSize: 4,
          lineWrapping: true,
          dragDrop: false,
          autoCloseBrackets: true,
          spellcheck:true,
          autocorrect:true,
          extraKeys:{"Ctrl-Space":"autocomplete"}
          
        }}
        onBeforeChange={(editor, data, value) => {
          this.setState({userCode:value});
        }}
        onChange={(editor, data, value) => {
         
        }}
      />
      

    );
  }
}

export default CodeEditor;
