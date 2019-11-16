
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






class ShowUnitTest extends Component {
  constructor(props){
    super(props);
    this.createFileTest = this.createFileTest.bind(this);
  }

  createFileTest(minitask) {
    let junit4 = ``;
      if (minitask.output_type_func.includes("[]") === true) {
        junit4 = `import static org.junit.Assert.assertArrayEquals;\n    import org.junit.Test;\n    import org.junit.runners.JUnit4;\n    public class TestFixture {\n    public TestFixture(){}\n `;
        minitask.unit_tests.forEach((unit_test, index) => {
          let inputs = "";
          unit_test.inputs.forEach(input => {
            if (input.type.includes("[]") === true) {
              // if input is array, add new input.type before input.value // new int[] {1,2,3,4}
              inputs += `new ${input.type} ${input.value},`;
            } else {
              inputs += `${input.value},`;
            }
          });

          let inputsFormat = inputs.substring(0, inputs.length - 1);
          junit4 += ` @Test\n    public void myTestFunction${index +
            1}(){\n    Solution s = new Solution();\n  assertArrayEquals("test ${index +
            1}", new ${minitask.output_type_func} ${
            unit_test.expected_output
          }, s.${minitask.name_func}(${inputsFormat}));\n  }\n`;
        });
        junit4 += `}`;
      } else {
        junit4 = `import static org.junit.Assert.assertEquals;\n    import org.junit.Test;\n    import org.junit.runners.JUnit4;\n    public class TestFixture {\n    public TestFixture(){}\n `;
        minitask.unit_tests.forEach((unit_test, index) => {
          let inputs = "";
          unit_test.inputs.forEach(input => {
            if (input.type.includes("[]") === true) {
              // if input is array, add new input.type before input.value // new int[] {1,2,3,4}
              inputs += `new ${input.type} ${input.value},`;
            } else {
              inputs += `${input.value},`;
            }
          });
          let inputsFormat = inputs.substring(0, inputs.length - 1);
          if (minitask.output_type_func === "double") {
            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertEquals("test ${index +
              1}", ${unit_test.expected_output}, s.${
              minitask.name_func
            }(${inputsFormat}),0);\n  }\n`;
          } else{
            junit4 += ` @Test\n    public void myTestFunction${index +
              1}(){\n    Solution s = new Solution();\n  assertEquals("test ${index +
              1}", ${unit_test.expected_output}, s.${
              minitask.name_func
            }(${inputsFormat}));\n  }\n`;
          }
          
        });
        junit4 += `}`;
      }

    return junit4;
  }
  render() {
    let minitask = {output_type_func : this.props.output_type_func,unit_tests:this.props.unit_tests,name_func:this.props.name_func};
    let junit4 = jBeautify(this.createFileTest(minitask),{indent_size: 2});
  
    return (
      <CodeMirror
      value={
        junit4
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

export default ShowUnitTest;
