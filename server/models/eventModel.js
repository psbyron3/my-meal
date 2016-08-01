const db = require('../db/db.js');

const Event = module.exports;

Event.findAllEvents = function () {
  return db.Event.findAll(); // Sequelize query
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

Event.findEventsByTime = function(datetime) {
  return; //Sequelize query
}

Event.findEventById = function (eventId) {
  return; // Sequelize query
};

Event.findEventByLocation = function (lat, lng) {
  return db.Event.findAll({
    where: {
      latitude: lat,
      longitude: lng
    }
  }); // Sequelize query
};


Event.createEvent = function (newEvent) {

  return db.Event.create(newEvent)
    .then((event) => {
      console.log('result of createEvent', event);
      console.log('newEvent is:', newEvent);
      db.User.findById(newEvent.userId).then(function (user) {
        console.log('User = ', user);
        event.setUsers([user], { role: 'host' });
      });
    }).then((event) => `Success! Created ${newEvent.eventName}`);

};
