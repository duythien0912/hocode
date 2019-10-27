import { ADD_CODEPOINT,GET_USER } from "./types";
import axios from "axios";

export const addCodePoint = (newCodePoint,userId) => dispatch => {
    axios
      .post("https://hocode.appspot.com/auth/userinfoupdate", {codepoint:newCodePoint,id:userId})
      .then(res => {
        dispatch({
            type: ADD_CODEPOINT,
            payload: res.data.codepoint
          })
      
      })
      .catch(
        err => 
        console.log(err)
      );
  };

  export const getUser = () => dispatch => {
    axios
      .get("https://hocode.appspot.com/auth/userinfo")
      .then(res => {
        console.log(res);
        dispatch({
            type: GET_USER,
            payload: res.data
          })
      
      })
      .catch(
        err => 
        console.log(err)
      );
  };
