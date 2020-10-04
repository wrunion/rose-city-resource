import { SET_NODE_DATA } from "./../actions/nodeData";

const initialNodeData = null;

export default function nodeData(state = initialNodeData, action) {
  switch (action.type) {
    case SET_NODE_DATA:
      return action.payload;
    default:
      return state;
  }
}