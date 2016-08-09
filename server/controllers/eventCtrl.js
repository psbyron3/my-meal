const Event = require('../models/eventModel.js');
const url = require('url');
const fs = require('fs');

const S3FS = require('s3fs');
const s3fsImpl = new S3FS('mymealmks', {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

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
        dishes: req.body.dishes,
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

  '/picture/': {
    get(req, res) {
      console.log('Received GET at /api/event/picture');
      res.end('Received GET at /api/event/picture');
    },
    post(req, res) {
      console.log('Received POST at /api/event/picture');
      const file = req.files.file; // get the file from the request object thanks to multyparty middleware
      const stream = fs.createReadStream(file.path); // read the file

      const fsImplStyles = s3fsImpl.getPath(file.name);
      const picUrl = `https://s3-us-west-2.amazonaws.com/${fsImplStyles.replace(' ', '')}`;
      // we are sending to s3 the file using this stream
      s3fsImpl.writeFile(file.originalFilename, stream, { ContentType: 'image/jpeg' })
        .then(() => {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error(err);
            }
          });
          return res.end(picUrl);
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/event/picture');
      res.end('Received PUT at /api/event/picture');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/event/picture');
      res.end('Received DELETE at /api/event/picture');
    },
  },
  '/location/': {
    get(req, res) {
      console.log('Received GET at /api/event/location');
      const loc = {
        lat: req.query.latitude,
        lng: req.query.longitude,
        //address: req.query.address,
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
  '/users/:userId': {
    get(req, res) {
      const userId = url.parse(req.url, true).path.slice(7);
      console.log('userId is:', userId);
      Event.findEventsByGuest(userId)
        .then((results) => {
          res.send(results);
        });
      console.log('Received GET at /api/user/events/:userId');
    },
    post(req, res) {
      console.log('Received POST at /api/user/events/:userId');
      res.end('Received POST at /api/user/events/:userId');
    },
    put(req, res) {
      console.log('Received PUT at /api/user/events/:userId');
      res.end('Received PUT at /api/user/events/:userId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/user/events/:userId');
      res.end('Received DELETE at /api/user/events/:userId');
    },
  },
  '/:eventId': {
    get(req, res) {
      // Used to get a specific event by id
      console.log('Received GET at /api/event/:eventId');

      const eventId = url.parse(req.url, true).path.slice(1);

      Event.findEventById(eventId)
        .then((event) => {
          if (event) {
            return res.send(event);
          }
          return res.end(`event ${eventId} not found`);
        });
    },
    post(req, res) {
      // Used to join an event
      const eventId = url.parse(req.url, true).path.slice(1);
      const userId = req.body.userId;
      Event.joinEvent(eventId, userId)
        .then((result) => {
          if (result.hasOwnProperty('dataValues')) {
            res.end('Successfully added user as guest');
          }
          res.end('Unable to add guest because of prior association');
        })
        .catch((err) => {
          res.end(`Error in attempt to join event #${eventId}`);
        });
    },
    put(req, res) {
      // Used to edit an event
      const eventId = url.parse(req.url, true).path.slice(1);
      console.log('Received PUT at /api/event/:eventId');
      Event.findEventById(eventId)
        .then((event) => event.update(req.body, { fields: Object.keys(req.body) }))
        .then(() => {
          res.end('Received PUT at /api/event/:eventId');
        });
    },
    delete(req, res) {
      // Used to delete an event
      const eventId = url.parse(req.url, true).path.slice(1);
      console.log('Received DELETE at /api/event/:eventId');
      Event.findEventById(eventId)
        .then(Event.destroyEvent);
      res.end('Received DELETE at /api/event/:eventId');
    },
  },
};
