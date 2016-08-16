import {
  GET_EVENTS_BY_USER_ID,
  POST_USER_REVIEW_OF_CHEF,
} from '../actions/index';


const INITIAL_STATE = {};

export default function (state = [], action) {
  switch (action.type) {

    case GET_EVENTS_BY_USER_ID :
      console.log('in reducer get events', action.payload.data);
      return action.payload.data;
    case POST_USER_REVIEW_OF_CHEF :
      return action.payload;
    default:
      return state;
  }
}
