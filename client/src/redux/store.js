import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./data/dataReducer";
import userReducer from "./user/userReducer";
import uiReducer from "./ui/uiReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import jwtDecode from "jwt-decode";

//initial state
const initialState = {};

const checkTokenExpirationMiddleware = () => next => action => {
  const token =
    localStorage.getItem("FBtoken");
  if (jwtDecode(token).exp < Date.now() / 1000 || !token) {
    next(action);
    localStorage.clear();

  }
  next(action);
};

//middleware
const middleware = [thunk];

//combine all reducers here
const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer,
});

//create store next using initial state, reducers and middleware
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
