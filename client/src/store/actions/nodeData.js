export const SET_NODE_DATA = "SET_NODE_DATA";

export default function nodeData(data) {
  return {
    type: SET_NODE_DATA,
    payload: data,
  };
}