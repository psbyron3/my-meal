import { ALL_USER_REVIEWS } from '../actions/index';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_USER_REVIEWS :
      return action.payload;
    default:
      return state;
  }
}
