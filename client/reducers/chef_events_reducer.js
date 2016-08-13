import { CHEF_EVENTS, CHEF_PAST_EVENTS, CHEF_UPCOMING_EVENTS } from '../actions/index';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHEF_EVENTS:
      console.log('INSIDE CHEF EVENTSSSSSS: ', action.payload);
      return {
        ...state,
        allChefEvents: action.payload,
      };

    case CHEF_PAST_EVENTS:
      console.log('INSIDE CHEF PAST EVENTS!!!!!', action.payload);
      return {
        ...state,
        chefPastEvents: action.payload,
      };

    case CHEF_UPCOMING_EVENTS:
      console.log('INSIDE CHEF UPCOMING EVENTS:::: ', action.payload);
      return {
        ...state,
        chefUpcomingEvents: action.payload,
      };

    default: return state;
  }
};
