const Event = require('../models/eventModel.js');
const url = require('url');

module.exports = {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/event/');
      console.log('getting all events');
      // maybe this should be findOne instead?
      Event.findAllEvents()
        .then((events) => {
          if (events.length === 0) {
            console.log('no events exist yet');
            res.end('no events exist yet');
          } else {
            console.log('events exist');
            res.send(events);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/event/');
      console.log('creating event');
      const newEvent = {
        eventName: req.body.eventName,
        eventPic: req.body.eventPic,
        description: req.body.description,
        price: req.body.price,
        maxGuests: req.body.maxGuests,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        startDatetime: req.body.startDatetime,
        endDatetime: req.body.endDatetime,
        userId: req.body.userId,
        dish: req.body.dish,
        tags: req.body.tags,
      };

      Event.findEventByLocationAndDate(
        newEvent.latitude,
        newEvent.longitude,
        newEvent.startDatetime,
        newEvent.endDatetime)
        .then((event) => {
          if (event.length > 0) {
            console.log('event already added');
            return res.send('event already added');
          }
          console.log('event does not exist');
          return Event.createEvent(newEvent)
            .then((result) => {
              console.log('result...', result);
              return res.send(result);
            });
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
      console.log('loc.lat', loc.lat);
      console.log('loc.lng', loc.lng);

      Event.findEventsInRadius(loc.lat, loc.lng)
        .then((result) => {
          console.log('returned radius stuff');
          res.send(result);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/event/location');
      res.end('Received POST at /api/event/location');
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

      const eventId = url.parse(req.url, true).path.slice(1);

      Event.findEventById(eventId)
        .then((event) => {
          if (event) {
            return res.send(event);
          }
          return res.end('event ', eventId, ' was not found');
        });
    },
    post(req, res) {
      console.log('Received POST at /api/event/:eventId');
      res.end('Received POST at /api/event/:eventId');
    },
    put(req, res) {
      const eventId = url.parse(req.url, true).path.slice(1);

      console.log('Received PUT at /api/event/:eventId');
      Event.findEventById(eventId)
        .then( (event) => {
          return event.update(req.body, {fields: Object.keys(req.body)});
        }).then(() => {
          res.end('Received PUT at /api/event/:eventId');
        });
    },
    delete(req, res) {
      // where does verification occur?
      const eventId = url.parse(req.url, true).path.slice(1);
      console.log('Received DELETE at /api/event/:eventId');
      Event.findEventById(eventId)
        .then(Event.destroyEvent);
      res.end('Received DELETE at /api/event/:eventId');
    },
  },
};
