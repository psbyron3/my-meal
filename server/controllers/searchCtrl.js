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
      if (!req.query.latitude || !req.query.longitude) {
        res.end('Error! No latitude and/or longitude supplied!');
        return;
      }

      const loc = {
        lat: req.query.latitude,
        lng: req.query.longitude,
      };

      Event.findEventsInRadius(loc.lat, loc.lng)
        .then((result) => {
          console.log('returned radius stuff');
          res.send(result);
        })
        .catch((err) => {
          console.log('error in findEventsInRadius...');
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
