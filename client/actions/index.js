import axios from 'axios';
import { browserHistory } from 'react-router';
import { convertAddress, reviewAverage } from '../utils/helper';
import Gravatar from 'gravatar';
const _ = require('lodash');

export const MAP_CENTER = 'MAP_CENTER';
export const SELECT_EVENT = 'SELECT_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_ERROR_SIGNUP = 'AUTH_ERROR_SIGNUP';
export const UNAUTH_USER = 'UNAUTH_USER';
export const GET_EVENTS_BY_USER_ID = 'GET_EVENTS_BY_USER_ID';
export const CHEF_EVENTS = 'CHEF_EVENTS';
export const CHEF_PAST_EVENTS = 'CHEF_PAST_EVENTS';
export const CHEF_UPCOMING_EVENTS = 'CHEF_UPCOMING_EVENTS';
export const ALL_USER_REVIEWS = 'ALL_USER_REVIEWS';
export const SEND_EVENT_ID = 'SEND_EVENT_ID';
export const CLOSE_CHAT_BOX = 'CLOSE_CHAT_BOX';
export const ALL_GENRES = 'ALL_GENRES';
export const ALL_RESTRICTIONS = 'ALL_RESTRICTIONS';
export const GET_EVENTS_TO_BE_REVIEWED = 'GET_EVENTS_TO_BE_REVIEWED';
export const USER_INFO = 'USER_INFO';
export const CLOSE_SEARCH_BOX = 'CLOSE_SEARCH_BOX';

export const getEventsByUserId = (userId) => {
  return axios.get(`/api/event/users/${userId}`)
    .then((response) => {
      return {
        type: GET_EVENTS_BY_USER_ID,
        payload: response,
      };
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

export const getEventsToBeReviewed = (userId) => {
  return axios.get(`/api/review/${userId}`)
    .then((reviews) => {
      return {
        type: GET_EVENTS_TO_BE_REVIEWED,
        payload: reviews,
      };
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
};

export const getReviewsByUserId = (userId) => {
  return axios.get(`/api/review/users/${userId}`)
    .then((reviews) => {
      const action = {
        type: ALL_USER_REVIEWS,
        payload: reviews.data,
      };
      return action;
    });
};

/** *************** AUTHENTICATIONS *********************/

export const SignInFunc = (props) => {
  const email = props.email;
  const password = props.password;
  return (dispatch) => {
    return axios({
      method: 'POST',
      url: '/api/auth/login',
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        dispatch({
          type: AUTH_USER,
        });
        dispatch({
          type: USER_INFO,
          payload: response.data.user,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('userName', response.data.user.userName);
        localStorage.setItem('userPic', response.data.user.userPic);
        const userId = response.data.user.id;

        return getEventsByUserId(response.data.user.id)
          .then((action) => {
            dispatch(action);
            return getReviewsByUserId(userId)
              .then((reviews) => {
                dispatch(reviews);
                browserHistory.push('/');
              });
          });
      })
      .catch(() => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Invalid email or password',
        });
      });
  };
};

export const SignUpFunc = (props, userPic) => {
  const { firstName, lastName, address, phoneNumber, userName, email, password } = props;
  if (userPic !== null) {
    const data = new FormData();
    data.append('file', userPic[0]);
    const opts = {
      transformRequest() { return data; },
    };
    return function (dispatch) {
      return axios.post('/api/event/picture', data, opts)
        .then((resp) => {
          const url = resp.data;
          return url;
        })
        .then((url) => {
          return axios({
            method: 'POST',
            url: '/api/auth/signup',
            data: {
              firstName,
              lastName,
              address,
              phoneNumber,
              userName,
              email,
              password,
              userPic: url,
            },
          })
            .then((response) => {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id', response.data.result.id);
              localStorage.setItem('userPic', response.data.result.userPic);
              dispatch({
                type: AUTH_USER,
              });
              dispatch({
                type: USER_INFO,
                payload: response.data.result,
              });
              browserHistory.push('/');
            })
            .catch((err) => {
              dispatch({
                type: AUTH_ERROR_SIGNUP,
                payload: 'Please use a different email',
              });
            });
        });
    };
  }
  return function (dispatch) {
    const url = `http:${Gravatar.url(email)}`;
    return axios({
      method: 'POST',
      url: '/api/auth/signup',
      data: {
        firstName,
        lastName,
        address,
        phoneNumber,
        userName,
        email,
        password,
        userPic: url,
      },
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.result.id);
        localStorage.setItem('userPic', response.data.result.userPic);
        dispatch({
          type: AUTH_USER,
        });
        dispatch({
          type: USER_INFO,
          payload: response.data.result,
        });
        browserHistory.push('/');
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR_SIGNUP,
          payload: 'Please use a different email',
        });
      });
  };
};

export const SignOutFunc = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('userId');
  // localStorage.removeItem('userName');
  // localStorage.removeItem('userPic');
  localStorage.clear();
  browserHistory.push('/');
  return {
    type: UNAUTH_USER,
  };
};

/** **********************USER FUNCTIONS**************************/

export const editUser = (userAttr) => {
  const userId = localStorage.getItem('userId');
  return function (dispatch) {
    return axios.put(`/api/user/${userId}`, userAttr)
      .then((response) => {
      // action dispatch on response should be the new updated user info
        dispatch({
          type: USER_INFO,
          payload: response.data,
        });
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };
};

/** ********************* CHEF DASHBOARD ***********************/

export const ChefEventsFunc = () => {
  const currentDate = new Date(Date.now());
  const userId = localStorage.getItem('userId');

  let chefEventsArray;

  return (dispatch) => {
    return axios({
      method: 'GET',
      url: `/api/event/users/${userId}`,
    })
      .then((response) => {
        chefEventsArray = response.data;

        return Promise.all(_.filter(chefEventsArray, (event) => {
          return event.UsersEvent.role === 'host';
        }))
          .then((chefEventFiltered) => {
            return Promise.all(_.map(chefEventFiltered, (event) => {
              const eventId = event.UsersEvent.eventId;
              return axios({
                method: 'GET',
                url: `/api/review/event/${eventId}`,
              })
                .then((reviews) => {
                  event.reviews = reviews.data;
                  const ratingArray = [];
                  _.each(event.reviews, (review) => {
                    if (typeof review.rating === 'number') {
                      ratingArray.push(review.rating);
                    }
                  });
                  event.rating = reviewAverage(ratingArray);
                  return event;
                });
            }));
          })
          .then((result) => {
            dispatch({
              type: CHEF_EVENTS,
              payload: result,
            });
          });
      })
      .catch((err) => {
        throw err;
      });
  };
};


export const DeleteEvent = (eventId) => {
  const currentDate = new Date(Date.now());
  const userId = localStorage.getItem('userId');

  let chefEventsArray;

  return (dispatch) => {
    return axios({
      method: 'DELETE',
      url: `/api/event/${eventId}`,
    })
      .then(() => {
        return axios({
          method: 'GET',
          url: `/api/event/users/${userId}`,
        })
          .then((response) => {
            chefEventsArray = response.data;
            return Promise.all(_.filter(chefEventsArray, (event) => {
              return event.UsersEvent.role === 'host';
            }))
              .then((chefEventFiltered) => {
                return Promise.all(_.map(chefEventFiltered, (event) => {
                  const eventID = event.UsersEvent.eventID;
                  return axios({
                    method: 'GET',
                    url: `/api/review/event/${eventID}`,
                  })
                    .then((reviews) => {
                      event.reviews = reviews.data;
                      const ratingArray = [];
                      _.each(event.reviews, (review) => {
                        if (typeof review.rating === 'number') {
                          ratingArray.push(review.rating);
                        }
                      });
                      event.rating = reviewAverage(ratingArray);
                      return event;
                    });
                }));
              })
              .then((result) => {
                dispatch({
                  type: CHEF_EVENTS,
                  payload: result,
                });
              });
          })
          .catch((err) => {
            throw err;
          });
      });
  };
};


/** ***************** EVENT FUNC ***********************/

export const getAllEvents = (latitude, longitude, tags, distance) => {
  return axios.get('/api/search/location', {
    params: {
      latitude,
      longitude,
      tags,
      distance,
    },
  });
};

export const getAllInRadius = (query, tags = [], distance = 5) => {
  // console.log('IN GETALLINRADIUS...searchParams =', tags, distance);
  // console.log('IN GETALLINRADIUS...query =', query);
  return function (dispatch) {
    convertAddress(query)
      .then((response) => {
        const { latitude, longitude } = response;
        dispatch({
          type: MAP_CENTER,
          payload: { latitude, longitude },
        });
        getAllEvents(latitude, longitude, tags, distance)
          .then((events) => {
            dispatch({
              type: GET_ALL_EVENTS,
              payload: events.data,
            });
          });
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
    browserHistory.push('home');
  };
};

export const selectEvent = (event) => {
  return {
    type: SELECT_EVENT,
    payload: event,
  };
};


export const createEvent = (props, dishPic) => {
  const targetAddress = props.address + props.city + props.usState;
  let coords = {};
  return convertAddress(targetAddress)
    .then((payload) => {
      coords = payload;
      if (dishPic !== null) {
        const data = new FormData();
        data.append('file', dishPic[0]);
        const opts = {
          transformRequest() { return data; },
        };
        return axios.post('/api/event/picture', data, opts);
      }
      return coords;
    })
    .then((resp) => {
      // console.log(resp, 'RESP WITH NO PICTURE');
      let url = null;
      if (typeof resp === 'object' && resp.data) {
        url = resp.data;
      } else {
        url = 'https://s3-us-west-2.amazonaws.com/mymealmks/logo.png';
      }

      return Object.assign({}, coords, { url });
    })
    .then((output) => {
      const userId = localStorage.getItem('userId');
      const params = {
        eventName: props.eventName,
        description: props.description,
        eventPic: output.url,
        price: props.price,
        maxGuests: props.maxGuest,
        address: output.address,
        latitude: output.latitude,
        longitude: output.longitude,
        startDatetime: props.start,
        endDatetime: props.end,
        userId,
      };

      return axios.post('/api/event/', params)
        .then((resp) => {
          browserHistory.push('/');
        })
        .catch((err) => {
          throw (err);
        });
    });
};

export const joinEvent = (eventId, userId) => {
  return axios.post(`api/event/join/${eventId}`, { userId })
    .then((events) => {
      return function (dispatch) {
        dispatch({
          type: GET_EVENTS_BY_USER_ID,
          payload: events,
        });
        return events;
      };
    });
};

/** **************REVIEWS*********************/


export const postUserReviewOfChef = (reviewData) => {
  // console.log('in post review action :', reviewData);
  return function (dispatch) {
    return axios.post('/api/review/', reviewData)
      .then((response) => {
        dispatch({
          type: GET_EVENTS_BY_USER_ID,
          payload: response,
        });
        return getReviewsByUserId(reviewData.reviewerId);
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  };
};


/** ******************** CHAT **************************/

export const EventIdFunc = (eventId, evName) => {
  const res = { eventId, evName };
  return {
    type: SEND_EVENT_ID,
    payload: res,
  };
};

export const ChatBoxFunc = (status) => {
  return {
    type: CLOSE_CHAT_BOX,
    payload: status,
  };
};

export const renderSearchFunc = (status) => {
  return {
    type: CLOSE_SEARCH_BOX,
    payload: status,
  };
};


/** ***********Tags*******************/

export const getAllTags = () => {
  return axios.get('/api/tag')
    .then((tags) => {
      const restrictions = tags.data.filter(tag => tag.restriction);
      const genres = tags.data.filter(tag => !tag.restriction);
      return function (dispatch) {
        dispatch({
          type: ALL_RESTRICTIONS,
          payload: restrictions,
        });
        dispatch({
          type: ALL_GENRES,
          payload: genres,
        });
      };
    })
    .catch((err) => {
      throw err;
    });
};
