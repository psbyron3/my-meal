import axios from 'axios';
import { browserHistory } from 'react-router';
import { convertAddress, reviewAverage } from '../utils/helper';
const _ = require('lodash');

export const MAP_CENTER = 'MAP_CENTER';
export const SELECT_EVENT = 'SELECT_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNAUTH_USER = 'UNAUTH_USER';
export const GET_EVENTS_BY_USER_ID = 'GET_EVENTS_BY_USER_ID';
export const CHEF_EVENTS = 'CHEF_EVENTS';
export const CHEF_PAST_EVENTS = 'CHEF_PAST_EVENTS';
export const CHEF_UPCOMING_EVENTS = 'CHEF_UPCOMING_EVENTS';
export const POST_USER_REVIEW_OF_CHEF = 'POST_USER_REVIEW_OF_CHEF';
export const SEND_EVENT_ID = 'SEND_EVENT_ID';
export const ALL_GENRES = 'ALL_GENRES';
export const ALL_RESTRICTIONS = 'ALL_RESTRICTIONS';
export const GET_EVENTS_TO_BE_REVIEWED = 'GET_EVENTS_TO_BE_REVIEWED';


export const getEventsByUserId = (userId) => {
  return axios.get(`/api/event/users/${userId}`)
    .then((response) => {
      return {
        type: GET_EVENTS_BY_USER_ID,
        payload: response,
      };
    })
    .catch((err) => {
      if (err) { console.error('err getting user events', err); }
    });
};

export const getEventsToBeReviewed = (userId) => {
  return axios.get(`/api/review/${userId}`)
    .then((reveiws) => {
      return {
        type: GET_EVENTS_TO_BE_REVIEWED,
        payload: reviews,
      }
    })
    .catch((err) => {
      if (err) { console.error('err getting reviews for user', err)}
    })
}

/** *************** AUTHENTICATIONS *********************/

export const SignInFunc = (props) => {
  const email = props.email;
  const password = props.password;
  return (dispatch) => {
    console.log('PROOOOOOOPS ');
    return axios({
      method: 'POST',
      url: '/api/auth/login',
      data: {
        email,
        password,
      },
    })
      .then((response) => {
      // console.log("RESPOOOOOOOONSE: ", response);
        console.log('HELLLLOOOOOOOOOOO', response);
      // dispatch action to update state to indicate that user is authenticate
        dispatch({
          type: AUTH_USER,
        });
        browserHistory.push('/');
      // save token to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('userName', response.data.user.userName);

        return getEventsByUserId(response.data.user.id)
          .then((action) => {
            dispatch(action);
            browserHistory.push('/dashboard');
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

export const SignUpFunc = (props) => {
  const firstName = props.firstName;
  const lastName = props.lastName;
  const address = props.address;
  const phoneNumber = props.phoneNumber;
  const userName = props.userName;
  const email = props.email;
  const password = props.password;

  return (dispatch) => {
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
      },
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.result.id);
        dispatch({
          type: AUTH_USER,
        });
        browserHistory.push('/');
      })
      .catch((err) => {
        console.log('ERROR', err);
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
};

export const SignOutFunc = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  browserHistory.push('/');
  return {
    type: UNAUTH_USER,
  };
};

/** ********************* CHEF DASHBOARD ***********************/

export const ChefEventsFunc = () => {
  const currentDate = new Date(Date.now());
  const userId = localStorage.getItem('userId');
  console.log('INITIAL LOGGING');

  let chefEventsArray;

  console.log('SOMETHING WRONG HERE???');

  return (dispatch) => {
    console.log('INSIDE CHEFEVENTSFUNC DISPATCH');
    return axios({
      method: 'GET',
      url: `/api/event/users/${userId}`,
    })
      .then((response) => {
        console.log('AFTER DISPATCH RESPONSE ', response);
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
                  console.log('EVEEEEENT REVIEEEWSSSS: ', event.reviews);
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
        console.log('ERROR', err);
      });
  };
};

export const ChefPastFunc = () => {
  // get request to db to fetch list of past events the user hosts
  const currentDate = new Date(Date.now());
  const userId = localStorage.getItem('userId');

  let chefPastArray;

  // look in db and filter events by users and event date < currentDate

  return (dispatch) => {
    console.log('INSIDE CHEFPAST DISPATCH');
    return axios({
      method: 'GET',
      url: `/api/event/users/${userId}`,
    })
      .then((response) => {
        console.log('CHEF PAST FUNC REEEES: ', response);
        chefPastArray = response.data;

        return Promise.all(_.filter(chefPastArray, (chefEvent) => {
          return Date.parse(chefEvent.startDatetime) < Date.parse(currentDate) && chefEvent.UsersEvent.role === 'host';
        }))
          .then((chefEventFiltered) => {
            return Promise.all(_.map(chefEventFiltered, (chefEvent) => {
              const eventId = chefEvent.UsersEvent.eventId;
              return axios({
                method: 'GET',
                url: `/api/review/event/${eventId}`,
              })
                .then((reviews) => {
                  chefEvent.reviews = reviews.data;
                  return chefEvent;
                });
            }));
          })
          .then((result) => {
            result.sort((a, b) => {
              return Date.parse(a.startDatetime) - Date.parse(b.startDatetime);
            });

            dispatch({
              type: CHEF_PAST_EVENTS,
              payload: result,
            });
          });
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  };
};

export const ChefUpcomingFunc = () => {
  // get request to db to fetch list of upcoming events the user hosted
  const currentDate = new Date(Date.now());
  const userId = localStorage.getItem('userId');

  let chefUpcomingArray;

  // look in db and filter events by users and event date < currentDate

  return (dispatch) => {
    return axios({
      method: 'GET',
      url: `/api/event/users/${userId}`,
    })
      .then((response) => {
        console.log('CHEF UPCOMING FUNC REEEES: ', response);
        chefUpcomingArray = response.data;

        return Promise.all(_.filter(chefUpcomingArray, (chefEvent) => {
          return Date.parse(chefEvent.startDatetime) > Date.parse(currentDate) && chefEvent.UsersEvent.role === 'host';
        }))
          .then((chefEventFiltered) => {
            return Promise.all(_.map(chefEventFiltered, (chefEvent) => {
              const eventId = chefEvent.UsersEvent.eventId;
              return axios({
                method: 'GET',
                url: `/api/review/event/${eventId}`,
              })
                .then((reviews) => {
                  chefEvent.reviews = reviews.data;
                  return chefEvent;
                });
            }));
          })
          .then((result) => {
            result.sort((a, b) => {
              return Date.parse(b.startDatetime) - Date.parse(a.startDatetime);
            });

            dispatch({
              type: CHEF_UPCOMING_EVENTS,
              payload: result,
            });
          });
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  };
};

export const ChefSelectedEvent = () => {
  // selected event in chef dash
};


/** ***************** EVENT FUNC ***********************/

export const getAllEvents = (locationObj, tags, distance) => {
  return axios.get('/api/event/location', {
    params: {
      locationObj,
      distance,
    }
  });
  console.log("ACTIONS getAllEvents params: ", params)
};

export const getAllInRadius = (query, tags = [], distance = 5) => {
  console.log('IN GETALLINRADIUS...searchParams =', tags, distance);
  console.log('IN GETALLINRADIUS...query =', query);
  return function (dispatch) {
    convertAddress(query)
      .then((response) => {
        const locationObj = {
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        };
        dispatch({
          type: MAP_CENTER,
          payload: locationObj,
        });
        getAllEvents(locationObj, tags, distance)
          .then((events) => {
          console.log("actions after getAllEvents :", events )
            dispatch({
              type: GET_ALL_EVENTS,
              payload: events.data,
            });
          });
      })
      .catch((err) => {
        if (err) {
          console.log('error searching location from actions searchLocation', err);
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

export const createEvent = (props) => {
  console.log('PROOOOOPS: ', props);
  const targetAddress = props.address + props.city + props.usState;
  return convertAddress(targetAddress)
    .then((payload) => {
      const address = payload.data.address;
      const latitude = payload.data.latitude;
      const longitude = payload.data.longitude;
      const coords = {
        address,
        latitude,
        longitude,
      };
      return coords;
    }).then((coords) => {
      console.log('PIC PARAAAAAMS: ', props.picture[0]);
      const data = new FormData();
      data.append('file', props.picture[0]);
      const opts = {
        transformRequest() { return data; },
      };
      axios.post('/api/event/picture', data, opts).then((resp) => {
        const url = resp.data;
        console.log(url, 'SUPPOSED URL');
        const output = {
          address: coords.address,
          latitude: coords.latitude,
          longitude: coords.longitude,
          url };
        return output;
      }).then((output) => {
        console.log(output, 'OUUUUUUUUTPPPPPPPOUUUUUUUUT');
        const params = {
          eventName: props.eventName,
      // foodType?? glutenFree, vegetarian, vegan??
          description: props.description,
          eventPic: output.url,
          price: props.price,
          maxGuests: props.maxGuest,
      // guestDecide??
          address: output.address,
          latitude: output.latitude,
          longitude: output.longitude,
          startDatetime: props.start,
          endDatetime: props.end,
        };

        console.log('PARAMSSSSSS', params);

        const request = axios.post('/api/event/', params);
        return {
          type: 'CREATE_EVENT',
          payload: request,
        };
      })
        .then(() =>
      browserHistory.push('/')
    )
        .catch((err) => {
          console.log('ERROR', err);
    // return {
    //   type: '??????????',
    //   payload: '??????????'
    // };
        });
    });
};

export const postUserReviewOfChef = (reviewData) => {
  console.log('in post review action :', reviewData);
  return axios.post('/api/review/', reviewData)
    .then((response) => {
      console.log('action review response: ', response);
      return {
        type: POST_USER_REVIEW_OF_CHEF,
        payload: response,
      };
    })
    .catch((err) => {
      if (err) { console.error('Could not post event review: ', err); }
    });
};

/** ******************** CHAT **************************/

export const EventIdFunc = (eventId) => {
  return {
    type: SEND_EVENT_ID,
    payload: eventId,
  };
};


/** ***********Tags*******************/

export const getAllTags = () => {
  console.log('inside getAllTags....');
  return axios.get('/api/tag')
    .then((tags) => {
      console.log('tags=====', tags);
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
      console.log('error in getAllTags:', err);
    });
};
