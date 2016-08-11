import { CHEF_PAST_EVENTS, CHEF_UPCOMING_EVENTS } from '../actions/index';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHEF_PAST_EVENTS: return {
      ...state,
      chefPastEvents: action.payload,
    };

    case CHEF_UPCOMING_EVENTS: return {
      ...state,
      chefUpcomingEvents: action.payload,
    };

    default: return state;
  }
};

// return list of events with reviews into state

