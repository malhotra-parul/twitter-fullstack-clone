import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import { composeWithDevTools } from "redux-devtools-extension";

//initial state
const initialState = {};

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