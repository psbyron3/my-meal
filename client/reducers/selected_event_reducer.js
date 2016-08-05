import { SELECT_EVENT } from '../actions/index.js';

export default function (state = {}, action) {
  switch (action.type) {
    case SELECT_EVENT:
      return action.payload;
    default:
      return state;
  }
}
