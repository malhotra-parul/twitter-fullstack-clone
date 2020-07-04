import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
} from "./userTypes";
import axios from "axios";
import { loadingUi, setErrors, clearErrors } from "../ui/uiActions";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
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
      dispatch(getUserData());
      dispatch(clearErrors());
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      dispatch(setErrors(err.response.data));
    });
};

const getUserData = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch(setUser(res.data));
    })
    .catch((err) => {
      console.error(err);
      dispatch(setErrors(err.response.data));
    });
};
