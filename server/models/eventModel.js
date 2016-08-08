const db = require('../db/db.js');
const User = require('./userModel.js');
const Tag = require('./tagModel.js');

const Event = module.exports;

Event.findAllEvents = function () {
  return db.Event.findAll(); // Sequelize query
};

Event.findEventById = function (eventId) {
  return db.Event.findById(eventId); // Sequelize query
};

Event.findEventsInRadius = function (lat, lng) {
  console.log('inside events in radius');
  console.log('lat', lat);
  console.log('lng', lng);
  const rad = 0.075;
  const currentDate = new Date();

  return db.Event.findAll({
    where: {
      latitude: { $between: [lat - rad, +lat + rad] },
      longitude: { $between: [lng - rad, +lng + rad] },
      startDatetime: { $gt: currentDate },
    },
  })
    .then((results) => {
      console.log('results from findEventsInRadius', results);
      return results;
    }); // Sequelize query
};

Event.findEventsByTime = function (start, end) {
  const eventStart = new Date(start);
  const eventEnd = new Date(end);
  return db.Event.findAll({
    where: {
      $or: [
        { startDatetime: { $between: [eventStart, eventEnd] } },
        { endDatetime: { $between: [eventStart, eventEnd] } },
        { startDatetime: { $lte: eventStart },
          endDatetime: { $gte: eventEnd },
        },
      ],
    },
  }); // Sequelize query `
};

Event.findEventByLocation = function (lat, lng) {
  return db.Event.findAll({
    where: {
      latitude: lat,
      longitude: lng,
    },
  });
};

Event.findEventByLocationAndDate = function (lat, lng, start, end) {
  const eventStart = new Date(start);
  const eventEnd = new Date(end);
  return db.Event.findAll({
    where: {
      latitude: lat,
      longitude: lng,
      $or: [
        { startDatetime: { $between: [eventStart, eventEnd] } },
        { endDatetime: { $between: [eventStart, eventEnd] } },
        { startDatetime: { $lte: eventStart },
          endDatetime: { $gte: eventEnd },
        },
      ],
    },
  }); // Sequelize query
};

// expect lat and lng to be decimals, start & end to be times formatted as strings, tags to be an array of ids
Event.findEventByLocationDateAndTag = function (lat, lng, start, end, tags) {
  return;
};

Event.createEvent = function (newEvent) {
  return db.Event.create(newEvent)
    .then((event) => {
      console.log('result of createEvent', event.eventName);
      console.log('newEvent is:', newEvent);
      return User.addHostToEvent(event, newEvent.userId)
        .then(() => {
          console.log('host added...adding tags', event);
          return Tag.addTagsToEvent(event, newEvent.tags)
            .then(() => event);
        });
    });
};

Event.joinEvent = function (eventId, userId) {
  // check to see if user relationship with event exists
  return db.Event.findById(eventId)
    .then((event) => {
      return event.getUsers({
        where: { id: userId },
      })
        .then((result) => {
          if (result.length) {
            return ([]);
          }
          return db.User.findById(userId)
            .then((user) => event.addUsers([user], { role: 'guest' }));
        });
    })
    .catch(err => {
      console.log('error is:', err);
    });
};

Event.destroyEvent = function (event) {
  console.log('typeof event receieved in destroyEvent:', typeof event);
  return event.destroy();
};
