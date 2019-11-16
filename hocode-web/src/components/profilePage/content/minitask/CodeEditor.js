
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

let jBeautify = require('js-beautify').js;





class CodeEditor extends Component {

  render() {
    const inputList = this.props.inputList || [];
    let template_code  ='';
    if(this.props.name_func !== '' ){
      template_code = `public ${this.props.output_type_func} ${
        this.props.name_func
      }(${inputList
        .map(input => {
          return `${input.input_type} ${input.input_name}`;
        })
        .join()}){ 
    
      }`
    }
    let template_code_format = jBeautify(template_code,{indent_size: 2});
    return (
      <CodeMirror
      value={
        template_code_format
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
          extraKeys:{"Ctrl-Space":"autocomplete"},
          readOnly:true,
          
        }}
        MarkText={{from:{line:0,ch:1}, to:{line:3,ch:1}, css: "font-size:5px"}}
        onBeforeChange={(editor, data, value) => {
           this.props.updateTemplateCode(value);// update state usercode in component minitaskpage
        }}
        onChange={(editor, data, value) => {
         
        }}
      />
      

    );
  }
}

export default CodeEditor;
