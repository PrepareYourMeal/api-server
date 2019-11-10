// Root Reducer
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
// import errorReducer from "./errorReducer";
// import profileReducer from "./profileReducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
});