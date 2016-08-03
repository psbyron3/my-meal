import axios from 'axios';
import { browserHistory } from 'react-router';

export const SEARCH_LOCATIONS = 'SEARCH-LOCATIONS';

export function searchLocations(searchParams) {
  return function(dispatch) {
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {address: searchParams.location, key: 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs'}
    })
      .then(response) {
        console.log('Coming back from map api', response.data);
        searchParams.lat = response.data.results[0].geometry.location.lat
        searchParams.lng = response.data.results[0].geometry.location.lng
        searchParams.address = response.data.results[0].formatted_address
        searchParams.name = response.data.results[0].formatted_address

        let determinedLocation = {
          address: response.data.results[0].formatted_address, 
          lat: response.data.results[0].geometry.location.lat, 
          lng: response.data.results[0].geometry.location.lng
        };


      }

      return {
        type : SEARCH_LOCATIONS,
        payload : searchParams
      }
  }
}
