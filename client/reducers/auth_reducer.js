import { AUTH_USER, AUTH_ERROR } from '../actions/index';

const INITIAL_STATE = {
  authenticated: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER: return Object.assign({}, state, {
      authenticated: true,
    });

    case AUTH_ERROR: return Object.assign({}, state, {
      error: action.payload,
    });

    default: return state;

  }
};
