const db = require('../db/db.js');
const User = require('./userModel.js');
const Tag = require('./tagModel.js');

const Event = module.exports;

// This is to be used for dev testing purposes only
Event.findAllEvents = function () {
  return db.Event.findAll({
    include: [
      {
        model: db.User,
        through: {
          model: db.UsersEvent,
          where: { role: 'host' },
        },
      },
      {
        model: db.Tag,
      },
    ],
  })
    .then((results) => results); // Sequelize query
};

// This is to take the place of findAllEvents at route '/api/event/' before deployment
Event.findLastEvent = function () {
  return db.Event.max('id')
    .then((maxId) => {
      return db.Event.findAll({
        where: { id: maxId },
      });
    })
    .catch((err) => {
      console.log('error in findLastEvent...', err);
      return err;
    });
};


Event.findEventById = function (eventId) {
  return db.Event.findById(eventId);
};

// expect lat and lng to be decimals, start & end to be times formatted as strings, tags to be an array of ids
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
    include: [
      {
        model: db.User,
        through: {
          model: db.UsersEvent,
          where: { role: 'host' },
        },
      },
      {
        model: db.Tag,
      },
    ],
  })
    .then((results) => {
      console.log('results from findEventsInRadius', results);
      return results;
    });
};

Event.findEventsByParams = function(lat, lng, distance, tags=[]) {
  console.log('inside events in params');
  console.log('lat', lat);
  console.log('lng', lng);
  console.log('distance =', distance);
  const radx = +(Math.abs(distance * (1 / (Math.cos(lat) * 69.172)))).toFixed(7);
  const rady = +(distance * (1 / 69.172)).toFixed(7);
  const currentDate = new Date();
  console.log('radx =', radx);
  console.log('rady =', rady);
  return db.Event.findAll({
    where: {
      latitude: { $between: [lat - rady, +lat + rady] },
      longitude: { $between: [lng - radx, +lng + radx] },
      startDatetime: { $gt: currentDate },
      include: {
        model: db.Tag,
        through: {
          model: db.TagsEvents,
          where: {
            tagId: {
              $in: tags
            }
          }
        }
      }
    },
    include: [
      {
        model: db.User,
        through: {
          model: db.UsersEvent,
          where: { role: 'host' },
        },
      },
      {
        model: db.Tag,
      },
    ],
  })
  .then((results) => {
    console.log('results from findEventsInRadius', results);
    return results;
  });


}

Event.findEventsByTags = function(tag) {
  return db.Event.findAll({

  })
}

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
  });
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
  });
};

Event.findEventsByUser = function (userId) {
  return db.User.findById(userId)
    .then((user) => {
      console.log('user is:', user);
      return user.getEvents()
        .then((results) => {
          console.log('results of getEvents:', results);
          return results;
        });
    });
};

Event.createEvent = function (newEvent) {
  const newE = Object.assign({}, newEvent, { attending: 0 });
  return db.Event.create(newE)
    .then((event) => {
      console.log('result of createEvent', event.eventName);
      console.log('newEvent is:', newEvent);
      return User.addHostToEvent(event, newEvent.userId)
        .then(() => {
          console.log('host added...adding tags');
          return Tag.addTagsToEvent(event, newEvent.tags)
            .then(() => event);
        });
    });
};

Event.joinEvent = function (eventId, userId) {
  return db.Event.findById(eventId)
    .then((event) => {
      if (!event) return {};
      return db.User.findById(userId)
        .then((user) => {
          if (!user) return {};
          return event.hasUser(user)
            .then((result) => {
              if (result) return {};
              return event.addUsers([user], { role: 'guest', wasReviewed: false })
                .then(() => {
                  return event.increment('attending');
                });
            });
        });
    })
    .catch((err) => err);
};

Event.quitEvent = function (eventId, userId) {
  return db.Event.findById(eventId)
    .then((event) => {
      if (!event) return {};
      return db.User.findById(userId)
        .then((user) => {
          if (!user) return {};
          return event.hasUser(user)
            .then((result) => {
              if (!result) return {};
              return event.removeUsers([user])
                .then(() => {
                  return event.decrement('attending');
                });
            });
        });
    })
    .catch((err) => err);
};

Event.destroyEvent = function (event) {
  console.log('typeof event receieved in destroyEvent:', typeof event);
  return event.destroy();
};
