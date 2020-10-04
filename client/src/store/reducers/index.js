import nodeData from './nodeData';
import searchData from './searchData';
import { combineReducers } from "redux";

export default combineReducers({
  nodeData: nodeData,
  searchData: searchData,
});