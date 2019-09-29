import React, { Component } from "react";
import AceEditor from 'react-ace';
import "brace/mode/java";
import "brace/snippets/java";
import "brace/ext/language_tools";
import "brace/theme/github";


class CodeEditor extends Component {
  render() {
    return (
      <AceEditor
      style={{
        
        position: 'absolute !important',
        top: '0 !important',
        left: '0 !important',
        bottom: '0 !important',
        right: '0 !important',
        
        
        }}
      editorProps={{
      $blockScrolling: Infinity
      }}
      placeholder="Placeholder Text"
      mode="java"
      theme="github"
      name="blah2"
      onLoad={this.onLoad}
      onChange={this.onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={`function onLoad(editor) {
      console.log("i've loaded");
    }`}
      setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      showLineNumbers: true,
      tabSize: 2,
      }}/>
    );
  }
}

export default CodeEditor;
