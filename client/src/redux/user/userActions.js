import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  SET_TOKEN
} from "./userTypes";
import axios from "axios";
import { loadingUi, setErrors, clearErrors } from "../ui/uiActions";
import setAuthToken from "../../utils/setAuthToken";

const setUser = (user, token) => {
  return {
    type: SET_USER,
    payload: user,
    token: token
  };
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch(loadingUi());
  axios
    .post("/login", userData)
    .then((res) => {
      const FBtoken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBtoken", FBtoken);
      axios.defaults.headers.common["Authorization"] = FBtoken;
      dispatch({
        type: "SET_TOKEN",
        payload: FBtoken
      });
      dispatch(getUserData());
      dispatch(clearErrors());
      history.push("/feed");
    })
    .catch((err) => {
      console.log(err);
      dispatch(setErrors(err.response.data));
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch(loadingUi());
  axios
    .post("/signup", newUserData)
    .then((res) => {
      const FBtoken = `Bearer ${res.data.tokenKey}`;
      localStorage.setItem("FBtoken", FBtoken);
      axios.defaults.headers.common["Authorization"] = FBtoken;
      dispatch({
        type: "SET_TOKEN",
        payload: FBtoken
      });
      dispatch(getUserData());
      dispatch(clearErrors());
      history.push("/feed");
    })
    .catch((err) => {
      console.log(err);
      dispatch(setErrors(err.response.data));
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBtoken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setUnauthenticated());
}

export const getUserData = () => (dispatch) => {
  if(localStorage.FBtoken){
    setAuthToken(localStorage.FBtoken);
  }
  dispatch(loadingUi());
  axios
    .get("/user")
    .then((res) => {
      dispatch(setUser(res.data, localStorage.getItem("FBtoken")));
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.error(err);
      dispatch(setErrors(err.response.data));
      dispatch(setUnauthenticated());
      
    });
};

const setUnauthenticated = () => {
  return {
    type: SET_UNAUTHENTICATED
  }
}

export const setAuthenticated = () => {
  return {
    type: SET_AUTHENTICATED
  }
}