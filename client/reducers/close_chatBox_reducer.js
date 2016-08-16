import { CLOSE_CHAT_BOX } from '../actions/index.js';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLOSE_CHAT_BOX: return {
      ...state,
      status: action.payload,
    };
    default: return state;
  }
};
