import { GET_EVENTS_BY_USER_ID } from '../actions/index';

const INITIAL_STATE = {};

export default function (state = [], action) {
  switch (action.type) {
    case GET_EVENTS_BY_USER_ID :
      console.log('In filtered reducer: ', action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}
