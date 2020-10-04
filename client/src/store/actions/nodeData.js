export const SET_NODE_DATA = "SET_NODE_DATA";

export function setNodeData(data) {
  return {
    type: SET_NODE_DATA,
    payload: data,
  };
}