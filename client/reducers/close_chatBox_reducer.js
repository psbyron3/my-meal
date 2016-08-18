import { CLOSE_CHAT_BOX } from '../actions/index.js';


export default (state = 'false', action) => {
  switch (action.type) {
    case CLOSE_CHAT_BOX: return {
      ...state,
      status: action.payload,
    };
    default: return state;
  }
};
