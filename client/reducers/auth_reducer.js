import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, AUTH_ERROR_SIGNUP } from '../actions/index';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER: return {
      ...state,
      authenticated: true,
      error: '',
    };

    case UNAUTH_USER: return {
      ...state,
      authenticated: false,
      error: '',
    };

    case AUTH_ERROR: return {
      ...state,
      error: action.payload,
    };

    case AUTH_ERROR_SIGNUP: return {
      ...state,
      error: action.payload,
    };


    default: return state;

  }
};
