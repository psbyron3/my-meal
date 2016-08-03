import { SEARCH_LOCATIONS } from '../actions/index.js'


export default function (state = [], action) {
  switch (action.type) {
    case SEARCH_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}
