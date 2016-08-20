import { GET_EVENTS_BY_USER_ID } from '../actions/index';


const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case GET_EVENTS_BY_USER_ID :
      return action.payload.data;
    default:
      return state;
  }
}
