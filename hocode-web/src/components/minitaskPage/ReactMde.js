import React, { Component } from 'react';
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
class ReactMde extends Component {
    constructor(props){
        super(props);
        this.state ={
            miniTaskDesc:''
        }
    }
    handleChange = value => {
        this.setState({
            miniTaskDesc: value
        });
      };
      handleSubmit = ()=>{
        axios.post('/minitaskdesc/', {
           id:1,
           desc: this.state.miniTaskDesc
          })
          .then(function (response) {
            
          })
          .catch(function (error) {
            
          });
      }
    render() {
        return (
            <div>   
                 <SimpleMDEReact
          className={""}
          label="Markdown Editor"
          value={this.state.miniTaskDesc}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Submit minitaskDesc</button>
            </div>
        );
    }
}

export default ReactMde;