import { CLOSE_SEARCH_BOX } from '../actions/index.js';


export default (state = { status: true }, action) => {
  switch (action.type) {
    case CLOSE_SEARCH_BOX: return {
      ...state,
      status: action.payload,
    };
    default: return state;
  }
};
