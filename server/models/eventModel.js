const db = require('../db/db.js');

const Event = module.exports;


Event.findEventById = function (id) {
  return; // Sequelize query
};

Event.findAllEvents = function () {
  return; // Sequelize query
};

Event.findEventByLocation = function (lat, lng) {
  return; // Sequelize query
};

Event.findEventsInRadius = function (lat, lng) {
  console.log('inside events in radius');
  const rad = 0.015;

  console.log('lat', lat);
  console.log('lng', lng);

  return db.Event.findAll({
    where: // sequelize.where(sequelize.fn('date', sequelize.col('startDatetime')), '>=', '2016-08-05'),
    {
      latitude: { $between: [lat - rad, lat + rad] },
      longitude: { $between: [lng - rad, lng + rad] },
      startDatetime: { $gt: '2016-08-05 23:59:59' },
    },
  }).then((results) => {
    console.log('results from findEventsInRadius', results);
    return results;
  }); // Sequelize query
};

Event.createEvent = function (attr) {

  return db.Event.create(attr)
    .then(function (event) {
      console.log('result of createEvent', event);
      console.log('attr is:', attr);
      db.User.findById(attr.userId).then(function (user) {
        console.log('User = ', user);
        event.setUsers([user], { role: 'host' });
      });
    }).then((event) => `Success! Created ${attr.eventName}`);

};
