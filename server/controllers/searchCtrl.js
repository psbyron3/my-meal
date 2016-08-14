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
      console.log('Received GET at /api/event/location');
      const latitude = req.query.latitude;
      const longitude = req.query.longitude;
      const tags = req.query.tags.split(',') || [27];
      const distance = req.query.distance || 5;

      Event.findEventsByParams(latitude, longitude, distance, tags)
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log('Error in api/search/test', err);
          res.send(err);
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
      const tags = req.query.tags.split(',') || [27];
      const distance = req.query.distance || 5;
      console.log('req.query.latitude.....', req.query.latitude);
      console.log('typeof req.query.tags.....', typeof req.query.tags);
      console.log('TAGS TAGS TAGS', tags);
      
      Event.findEventsByParams(latitude, longitude, distance, tags)
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log('Error in api/search/test', err);
          res.send(err);
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
