import axios from 'axios';
const _ = require('lodash');

export const convertAddress = (address) => {
  let response;
  let coordinate;
  console.log('inside convertAddress.....', address);
  return axios({
    method: 'GET',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {
      address,
      key: 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs',
    },
  })
    .then((payload) => {
      console.log('inside response to convertAddress..', payload);
      response = payload.data.results[0].geometry.location;
      coordinate = {
        latitude: response.lat,
        longitude: response.lng,
        address,
      };
      return coordinate;
    })
    .catch((err) => {
      console.log('ERROR ', err);
    });
};

export const reviewAverage = (reviews) => {
  if (reviews.length === 0) {
    return 'n/a';
  }
  return _.reduce(reviews, (sum, current) => {
    return sum + current;
  }, 0) / reviews.length;
};

export const organizeChefPast = (allEvents) => {
  const currentDate = new Date(Date.now());
  let chefPastEvents;

  new Promise((resolve, reject) => {
    chefPastEvents = _.filter(allEvents, (event) => {
      return Date.parse(event.startDatetime) < Date.parse(currentDate);
    });
    resolve(chefPastEvents);
  })
    .then((result) => {
      result.sort((a, b) => {
        return Date.parse(b.startDatetime) - Date.parse(a.startDatetime);
      });
    });
  return chefPastEvents;
};


export const organizeChefUpcoming = (allEvents) => {
  const currentDate = new Date(Date.now());
  let chefUpcomingEvents;

  new Promise((resolve, reject) => {
    chefUpcomingEvents = _.filter(allEvents, (event) => {
      return Date.parse(event.startDatetime) > Date.parse(currentDate);
    });
    resolve(chefUpcomingEvents);
  })
    .then((result) => {
      result.sort((a, b) => {
        return Date.parse(a.startDatetime) - Date.parse(b.startDatetime);
      });
    });
  return chefUpcomingEvents;
};

