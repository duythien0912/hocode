import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer, //auth la state de minh goi o cac component can dung : state.auth
  errors: errorReducer
});
