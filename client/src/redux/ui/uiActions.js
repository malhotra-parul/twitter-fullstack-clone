import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "./uiTypes";
import { SET_USER } from "../types";

export const loadingUi = () => {
  return {
    type: LOADING_UI,
  };
};

export const setErrors = (error) => {
  return {
    type: SET_ERRORS,
    payload: error,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
