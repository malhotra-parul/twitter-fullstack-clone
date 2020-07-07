import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED,
  LOADING_USER,
  SET_TOKEN
} from "./userTypes";

const initialState = {
  token: localStorage.getItem("FBtoken"),
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      localStorage.removeItem("FBtoken");
      
      return {
        token: null,
        authenticated: false,
        credentials: {},
        likes: [],
        notifications: [],
      };
    case SET_USER:
      return {
        ...state,
        token: action.token,
        authenticated: true,
        ...action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        authenticated: true
      }
    default:
      return state;
  }
};

export default userReducer;
