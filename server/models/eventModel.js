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
    .then((results) => results)
    .catch((err) => err); // Sequelize query
};

// This is to take the place of findAllEvents at route '/api/event/' before deployment
Event.findLastEvent = function () {
  return db.Event.max('id')
    .then((maxId) => (
      db.Event.findAll({
        where: { id: maxId },
      })
    ))
    .catch((err) => (err));
      // console.log('error in findLastEvent...', err);
};

Event.findEventById = function (eventId) {
  return db.Event.findById(eventId);
};

// expect lat and lng to be decimals, start & end to be times formatted as strings, tags to be an array of ids
Event.findEventsInRadius = function (lat, lng) {
  const distance = 5;
  const radx = +(Math.abs(distance * (1 / (Math.cos(lat) * 69.172)))).toFixed(7);
  const rady = +(distance * (1 / 69.172)).toFixed(7);
  const currentDate = new Date();

  return db.Event.findAll({
    where: {
      latitude: { $between: [lat - rady, +lat + rady] },
      longitude: { $between: [lng - radx, +lng + radx] },
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
      const filtered = results.filter((event) => event.Users.length);
      return filtered;
    })
    .catch((err) => (err));
      // console.log('error in findEventsInRadius', err)
};

Event.findEventsByParams = function (lat, lng, distance = 5, tags = []) {
  const radx = +(Math.abs(distance * (1 / (Math.cos(lat) * 69.172)))).toFixed(7);
  const rady = +(distance * (1 / 69.172)).toFixed(7);
  const currentDate = new Date();

  return db.Event.findAll({
    where: {
      latitude: { $between: [lat - rady, +lat + rady] },
      longitude: { $between: [lng - radx, +lng + radx] },
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
        attributes: ['id', 'tagName'],
      },
    ],
  })
    .then((events) => (
      events.filter((event, index) => {
        let tagMatch = 0;
        let lastIndex = 0;
        if (tags.length <= event.Tags.length) {
          tags.forEach((tag) => {
            for (let i = lastIndex; i < event.Tags.length || tagMatch === tags.length; i++) {
              if (event.Tags[i].id === +tag) {
                lastIndex = i + 1;
                tagMatch++;
                return;
              }
            }
          });
        }
        // event.Users.length ensures that events with no relationship in the join table won't return
        return tagMatch === tags.length && event.Users.length;
      })
    ))
    .catch((err) => err);
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

// Used in joinEvent to check for double-booking
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
  })
    .catch((err) => err);
};

// Used to populate user dashboard
Event.findEventsByUser = function (userId) {
  return db.User.findById(userId)
    .then(user => (
      // console.log('user is:', user);
      user.getEvents({
        include: [
          {
            model: db.User,
            through: {
              model: db.UsersEvent,
              where: { userId },
            },
          },
        ],
      })
    ))
    .catch((err) => err);
};

Event.createEvent = function (newEvent) {
  // console.log(newEvent, 'EVENT CREATED WHERE BUG+++++++++++++++++++++++++++++++++++++++++++++');
  const newE = Object.assign({}, newEvent, { attending: 0 });
  return db.Event.create(newE)
    .then(event => (
      // console.log('result of createEvent', event.eventName, newEvent.userId);
      User.addHostToEvent(event, newEvent.userId)
        .then(() => Tag.addTagsToEvent(event, newEvent.tags))
          // console.log('host added...adding tags');
        .then(() => Event.findEventsByUser(newEvent.userId))
          // console.log('tags added, getting events....');
    ));
};

Event.joinEvent = function (eventId, userId) {
  // console.log(`eventId is .... ${eventId}, and userId is....${userId}`);
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
                .then(() => event.increment('attending'))
                .then(() => Event.findEventsByUser(userId));
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
                .then(() => event.decrement('attending'));
            });
        });
    })
    .catch((err) => err);
};

// To be used only by chefs
Event.destroyEvent = function (event) {
  return event.destroy();
};
