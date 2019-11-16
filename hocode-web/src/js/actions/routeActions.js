

import { UPDATE_LOCATION } from "./types";

// Login - get user token
export const nullLocation = () => dispatch => {

    dispatch({
        type: UPDATE_LOCATION,
        payload: null
      });

};
