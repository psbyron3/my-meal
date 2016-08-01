const Event = require('../models/eventModel.js');
const User = require('../models/userModel.js');
const url = require('url');

module.exports = {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/event/');
      console.log('getting all events');

      Event.findAllEvents()
        .then(function (events) {
          if (events.length === 0) {
            console.log('no events exist yet');
            res.end('no events exist yet');
          } else {
            console.log('events exist');
            res.send(events);
          }
        });
    },
    post(req, res) {
      console.log('Received POST at /api/event/');
      console.log('creating event');

      const newEvent = {
        name: req.body.name,
        description: req.body.description,
        id_Users: req.body.id_Users,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
      };

      Event.findEventByLocation(newEvent.latitude, newEvent.longitude)
        .then(function (event) {
          if (event) {
            console.log('event already added');
          } else {
            console.log('event does not exist');

            Event.createEvent(newEvent)
              .then(function (result) {
                console.log('result', result);

                return res.send(result);
              });
          }
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/event/');
      res.end('Received PUT at /api/event/');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/event/');
      res.end('Received DELETE at /api/event/');
    },
  },
  '/location/': {
    get(req, res) {
      console.log('Received GET at /api/event/location');
      const loc = {
        lat: req.query.latitude,
        lng: req.query.longitude,
        address: req.query.address,
      };


      Event.findEventsInRadius(loc.lat, loc.lng)
        .then(function (result) {
          console.log('returned radius stuff');
          res.send(result);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/event/location');
    },
    put(req, res) {
      console.log('Received PUT at /api/event/location');
      res.end('Received PUT at /api/event/location');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/event/location');
      res.end('Received DELETE at /api/event/location');
    },
  },
  '/:eventId': {
    get(req, res) {
      console.log('Received GET at /api/event/:eventId');

      const eventID = url.parse(req.url, true).path.slice(1);

      Event.findEventById(eventID)
        .then(function (event) {
          if (event) {
            console.log('event', eventID, 'was found, returning');
            res.send(event);
          } else {
            console.log('event', eventID, 'was not found');
            res.end('event ', eventID, ' was not found');
          }
        });
    },
    post(req, res) {
      console.log('Received POST at /api/event/:eventId');
      res.end('Received POST at /api/event/:eventId');
    },
    put(req, res) {
      console.log('Received PUT at /api/event/:eventId');
      res.end('Received PUT at /api/event/:eventId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/event/:eventId');
      res.end('Received DELETE at /api/event/:eventId');
    },
  },
};
