import { GET_ALL_EVENTS } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_EVENTS :
      return action.payload;
    default:
      return state;
  }
}
