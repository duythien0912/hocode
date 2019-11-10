import { ADD_CODEPOINT, GET_USER, CHANGE_USER_INFO,CHANGE_LOADING } from "./types";
import axios from "axios";

export const addCodePoint = (newCodePoint, userId) => dispatch => {
  axios
    .post("https://hocode.appspot.com/auth/userinfoupdate", {
      codepoint: newCodePoint,
      id: userId
    })
    .then(res => {
      dispatch({
        type: ADD_CODEPOINT,
        payload: res.data.codepoint
      });
    })
    .catch(err => console.log(err));
};

export const changeUserInfo = (newUser, userId) => dispatch => {
  console.log(newUser);
  dispatch({
    type: CHANGE_LOADING,
    payload: true
  });
  axios
    .post("https://hocode.appspot.com/auth/userinfoupdate", {
      id: userId,
      avatar: newUser.avatar,
      password: newUser.password,
      firstname: newUser.firstName,
      lastname: newUser.lastName,
      
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: CHANGE_USER_INFO,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getUser = () => dispatch => {
  axios
    .get("https://hocode.appspot.com/auth/userinfo")
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
