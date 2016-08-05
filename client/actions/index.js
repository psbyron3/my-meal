import axios from 'axios';
import { browserHistory } from 'react-router';
// import thunk from 'redux-thunk';

export const MAP_CENTER = 'MAP_CENTER';
export const SELECT_EVENT = 'SELECT_EVENT';
export const CREATE_EVENT = 'CREATE_EVENT';
export const GET_ALL_EVENTS = 'GET_ALL_EVENTS';

export function SignInFunc(props) {
  const email = props.email;
  const password = props.password;

  return axios({
    method: 'GET',
    url: '/api/auth/login',
    params: {
      email,
      password,
    },
  })
    .then((payload) => {
      console.log('PAYLOOOOOOOOAAAAD: ', payload);
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    });
}

export function convertAddress(address) {
  let response;
  let coordinate;

  return axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {
      address,
      key: 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs',
    },
  })
    .then((payload) => {
    // try console.log payload here
      response = payload.data.results[0].geometry.location;
      coordinate = {
        latitude: response.lat,
        longitude: response.lng,
        address,
      };
      return {
        data: coordinate,
      };
    })
    .catch((err) => {
      console.log('ERROR ', err);
    });
}

export function getAllEvents(locationObj) {
  return axios.get('/api/event/location', {
    params: locationObj,
  });
}

export function getAllInRadius(searchParams) {
  console.log('IN GETALLINRADIUS...searchParams =', searchParams);
  return function (dispatch) {
    convertAddress(searchParams.query)
      .then(function (response) {
        console.log('Coming back from map api', response.data);
        const locationObj = {
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        };
        dispatch({
          type: MAP_CENTER,
          payload: locationObj,
        });
        getAllEvents(locationObj)
          .then(function (events) {
            console.log('here come the events : ', events);
            dispatch({
              type: GET_ALL_EVENTS,
              payload: events.data,
            });
          });
      })
      .catch(function (err) {
        if (err) {
          console.log('error searching location from actions searchLocation', err);
        }
      });
  };
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event,
  };
}

export function createEvent(props) {
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
}
