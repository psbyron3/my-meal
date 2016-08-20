import { CHEF_EVENTS, CHEF_PAST_EVENTS, CHEF_UPCOMING_EVENTS } from '../actions/index';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHEF_EVENTS:
      return {
        ...state,
        allChefEvents: action.payload,
      };
    default: return state;
  }
};
