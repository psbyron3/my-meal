const db = require('../db/db.js');

const Event = module.exports;

Event.findEventById = function (id) {
  return; // Sequelize query
};

Event.findAllEvents = function () {
  return; // Sequelize query
};

Event.findEventByLocation = function (lat, long) {
  return; // Sequelize query
};

Event.findEventsInRadius = function (lat, long) {
  console.log('inside events in radius');
  const rad = 0.015;

  console.log('lat', lat);
  console.log('long', long);

  return; // Sequelize query
};

Event.createEvent = function (attr) {
return new Promise(function(resolve, reject) {
    return db.Event.create(attr)
      .then(function(result) {
        attr.id = result.dataValues.id;
        resolve(attr);
      });    
  });
};
