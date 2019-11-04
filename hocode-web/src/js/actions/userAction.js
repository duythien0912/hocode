import { ADD_CODEPOINT,GET_USER,CHANGE_USER_INFO } from "./types";
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

  export const changeUserInfo = (newUser,userId) => dispatch => {
    
    axios
      .post("https://hocode.appspot.com/auth/userinfoupdate", {user:newUser,id:userId})
      .then(res => {
        console.log(res.data)
        dispatch({
            type: CHANGE_USER_INFO,
            payload: res.data.user
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
