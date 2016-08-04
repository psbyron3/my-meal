import axios from 'axios';
import { browserHistory } from 'react-router';

export const SEARCH_LOCATIONS = 'SEARCH_LOCATIONS';
export const SELECT_EVENT = 'SELECT_EVENT';
export const CREATE_TOILET = 'CREATE_TOILET';

export function searchLocations(searchParams) {
  return function (dispatch) {
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: { address: searchParams.location, key: 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs' },
    })
      .then(function (response) {
        console.log('Coming back from map api', response.data);
        // searchParams.lat = response.data.results[0].geometry.location.lat;
        // searchParams.lng = response.data.results[0].geometry.location.lng;
        // searchParams.address = response.data.results[0].formatted_address;
        // searchParams.name = response.data.results[0].formatted_address;

        const determinedLocation = {
          address: response.data.results[0].formatted_address,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        };
      })
      .catch(function (err) {
        if (err) {
          console.log('error searching location from actions searchLocation', err);
        }
      });

    return {
      type: SEARCH_LOCATIONS,
      payload: searchParams,
    };
  };
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event,
  };

export function createEvent(props) {
  console.log("PROOOOOPS: ", props);
  let targetAddress = props.address + props.city + props.usState;
  return convertAddress(targetAddress)
  .then((payload) => {
    let address = payload.data.address;
    let latitude = payload.data.latitude;
    let longitude = payload.data.longitude;

    let params = {
      eventName: props.eventName,
      // foodType?? glutenFree, vegetarian, vegan??
      description: props.description,
      price: props.price,
      maxGuests: props.maxGuest,
      // guestDecide??
      address,
      latitude,
      longitude,
      startDatetime: props.start,
      endDatetime: props.end
    }

    console.log("PARAAAAAMS: ", params);

    const request = axios.post('./api/event', params);
    return {
      type: CREATE_TOILET,
      payload: request
    }
  })
  .then( () => 
      browserHistory.push('/')
    )
  .catch((err) => {
    console.log('ERROR', err);
    // return {
    //   type: '??????????',
    //   payload: '??????????'
    // };
  })
}

export function convertAddress(address) {
  return new Promise((resolve, reject) => {
    let response;
    let coordinate;

    resolve(axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        address,
        key: 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs'
      }
    })
    .then((payload) => {
      // try console.log payload here
      response = payload.data.results[0].geometry.location;
      coordinate = {
        latitude: response.lat,
        longitude: response.lng,
        address
      }
      return {
        data: coordinate
      }
    }))
    .catch((err) => {
      console.log('ERROR ', err)
    })
  })
}
