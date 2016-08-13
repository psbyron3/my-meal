import { ALL_RESTRICTIONS, ALL_GENRES } from '../actions/index';

export default function (state = {
  restrictions: [],
  genres: [],
}, action) {
  switch (action.type) {
    case ALL_RESTRICTIONS :
      return Object.assign({}, state, { restrictions: action.payload });
    case ALL_GENRES :
      return Object.assign({}, state, { genres: action.payload });
    default:
      return state;
  }
}
