export const SET_SEARCH_DATA = "SET_SEARCH_DATA";

export default function setSearchData(data) {
  return {
    type: SET_SEARCH_DATA,
    payload: data,
  };
}