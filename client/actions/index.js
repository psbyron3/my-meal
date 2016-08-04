import axios from 'axios';
import { browserHistory } from 'react-router';

export const SEARCH_LOCATIONS = 'SEARCH_LOCATIONS';
export const SELECT_EVENT = 'SELECT_EVENT';

export function searchLocations(searchParams) {
  return function (dispatch) {
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: { address: searchParams.query, key: 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs' },
    })
      .then(function (response) {
        console.log('Coming back from map api', response.data);

        const locationObj = {};
        locationObj.lat = response.data.results[0].geometry.location.lat;
        locationObj.lng = response.data.results[0].geometry.location.lng;

        dispatch({
          type: SEARCH_LOCATIONS,
          payload: locationObj,
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
