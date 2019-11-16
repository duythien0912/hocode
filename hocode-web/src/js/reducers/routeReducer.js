import { UPDATE_LOCATION } from "../actions/types";


const initialState = {
  router: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        router: null,
      }; 
    default:
      return state;
  }
}
