import { POST_USER_REVIEW_OF_CHEF } from '../actions/index';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_USER_REVIEW_OF_CHEF :
      return action.payload;
    default:
      return state;
  }
}
