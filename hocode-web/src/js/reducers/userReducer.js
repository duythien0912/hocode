import { ADD_CODEPOINT, GET_USER, CHANGE_USER_INFO,CHANGE_LOADING,SET_UNDEFINED_NEXT_MINITASK } from "../actions/types";

const initialState = {
  avatar: "",
  codepoint: 0,
  email: "",
  firstname: "",
  id: "",
  lastname: "",
  isUserLoading:false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CODEPOINT:
      return {
        ...state,
        ...action.payload,
        isUserLoading:false
      };
    case GET_USER:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_USER_INFO:
      return {
        ...state,
        avatar:action.payload.avatar,
        codepoint:action.payload.codepoint,
        email:action.payload.email,
        firstname:action.payload.firstname,
        lastname:action.payload.lastname,
        isUserLoading: false
      };
      case SET_UNDEFINED_NEXT_MINITASK:
          return {
            ...state,
            next_minitask: action.payload
          }; 
      case CHANGE_LOADING:
        return {
          ...state,
          isUserLoading: action.payload
        }; 
    default:
      return state;
  }
}
