import { SEND_EVENT_ID } from '../actions/index';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_EVENT_ID: return {
      ...state,
      id: action.payload,
    };
    default: return state;
  }
};
