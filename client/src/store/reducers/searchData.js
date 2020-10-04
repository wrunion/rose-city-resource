import { SET_SEARCH_DATA } from "./../actions/searchData";

const initialSearchData = null;

export default function searchData(state = initialSearchData, action) {
  switch (action.type) {
    case SET_SEARCH_DATA:
      return action.payload;
    default:
      return state;
  }
}