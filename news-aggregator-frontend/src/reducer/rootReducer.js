import { combineReducers } from "redux";
import userReducer from "./userReducer";
import newsReducer from "./newsSearchReducer";
import userPreferencesReducer from "./userPreferencesReducer";

export default combineReducers({
  user: userReducer,
  news: newsReducer,
  userPreferences: userPreferencesReducer
});