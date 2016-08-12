import axios from 'axios';

const _ = require('lodash');

export const convertAddress = (address) => {
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
};

export const eventSort = (events) => {
  let temp;

  for (let i = 1; i < events.length; i++) {
    temp = events[i];
    for (let j = i - 1; j >= 0 && (Date.parse(events[j].startDatetime) < Date.parse(temp.startDatetime)); j--) {
      events[j + 1] = events[j];
      events[j] = temp;
    }
  }
   
  return events;
}
