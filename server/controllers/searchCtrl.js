const Event = require('../models/eventModel.js');
const User = require('../models/userModel.js');
const Tag = require('../models/tagModel.js');
const url = require('url');

module.exports = {
  '/': {
    get(req, res) {
      Event.findLastEvent()
        .then((result) => {
          console.log('returning last event...');
          res.send(result);
        })
        .catch((err) => {
          console.log('error in GET \'/\' findLastEvent...');
          res.send(err);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/search');
      res.end('Received POST at /api/search');
    },
    put(req, res) {
      console.log('Received PUT at /api/search');
      res.end('Received PUT at /api/search');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/search');
      res.end('Received DELETE at /api/search');
    },
  },
  '/location': {
    get(req, res) {
      console.log('Received GET at /api/search/location....+++++.....', req.query);
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const distance = req.query.distance || 5;
      let tags = req.query.tags || [];
      if (!Array.isArray(tags)) {
        tags = tags.split(',');
      }

      Event.findEventsByParams(latitude, longitude, distance, tags)
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log('Error in api/search/location', err);
          // err is put in array in response to satisfy proptypes on client side
          res.send([err]);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/search/location');
      res.end('Received POST at /api/search/location');
    },
    put(req, res) {
      console.log('Received PUT at /api/search/location');
      res.end('Received PUT at /api/search/location');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/search/location');
      res.end('Received DELETE at /api/search/location');
    },
  },
  '/test': {
    get(req, res) {
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const distance = req.query.distance || 5;
      let tags = req.query.tags || [];
      if (!Array.isArray(tags)) {
        tags = tags.split(',');
      }

      Event.findEventsByParams(latitude, longitude, distance, tags)
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log('Error in api/search/test', err);
          // err is put in array in response to satisfy proptypes on client side
          res.send([err]);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/search/location');
      res.end('Received POST at /api/search/location');
    },
    put(req, res) {
      console.log('Received PUT at /api/search/location');
      res.end('Received PUT at /api/search/location');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/search/location');
      res.end('Received DELETE at /api/search/location');
    },
  },

};
