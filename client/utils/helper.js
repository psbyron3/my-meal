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

export const reviewAverage = (reviews) => {
  if (reviews.length === 0) {
    return 'n/a';
  }
  return _.reduce(reviews, function (sum, current) {
    return sum + current;
  }, 0) / reviews.length;
};

