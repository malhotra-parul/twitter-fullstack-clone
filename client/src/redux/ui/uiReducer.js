import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "./uiTypes";

const initialState = {
  loading: false,
  errors: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default uiReducer;
