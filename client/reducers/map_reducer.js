import { MAP_CENTER } from '../actions/index.js';


export default function (state = [], action) {
  switch (action.type) {
    case MAP_CENTER:
      console.log('in reducer payload: ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
