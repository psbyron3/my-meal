import { MAP_CENTER } from '../actions/index.js';

export default function (state = [], action) {
  switch (action.type) {
    case MAP_CENTER:
      return action.payload;
    default:
      return state;
  }
}
