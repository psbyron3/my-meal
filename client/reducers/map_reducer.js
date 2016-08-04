import { CONVERT_ADDRESS } from '../actions/index.js';


export default function (state = [], action) {
  switch (action.type) {
    case CONVERT_ADDRESS:
      console.log('in reducer payload: ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
