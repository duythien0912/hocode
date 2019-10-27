import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer, //auth la state de minh goi o cac component can dung : state.auth
  errors: errorReducer,
  user: userReducer
});
