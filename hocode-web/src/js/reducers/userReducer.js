import { ADD_CODEPOINT, GET_USER, CHANGE_USER_INFO } from "../actions/types";

const initialState = {
  avatar: "",
  codepoint: 0,
  email: "",
  firstname: "",
  id: "",
  lastname: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CODEPOINT:
      return {
        ...state,
        codepoint: action.payload
      };
    case GET_USER:
      return {
        ...action.payload
      };
    case CHANGE_USER_INFO:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
