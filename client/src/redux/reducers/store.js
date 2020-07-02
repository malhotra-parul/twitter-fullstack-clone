import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import dataReducer from "./dataReducer";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

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
  compose(applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;