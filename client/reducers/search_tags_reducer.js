import { UPDATE_RESTRICTIONS, UPDATE_GENRE } from '../actions/index';

export default function (state = { restrictions: [], genre: [] }, action) {
  switch (action.type) {
    case UPDATE_RESTRICTIONS :
      return Object.assign({}, state, { restrictions: action.payload });
    case UPDATE_GENRE :
      return Object.assign({}, state, { genre: action.payload });
    default:
      return state;
  }
}
