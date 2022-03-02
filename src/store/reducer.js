import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";

export default combineReducers({
  recommend:recommendReducer
})