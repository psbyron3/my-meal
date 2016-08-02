const db = require('../db/db.js');

const Review = module.exports;


// create review for event in attr
Review.createReview = function (attr) {
  return db.Review.create(attr)
    .then(function (review) {
      console.log('result of createEvent', review);
      console.log('attr is:', attr);
      db.Event.findById(attr.userId).then(function (user) {
        console.log('User = ', user);
        event.setUsers([user], { role: 'host' });
      });
    }).then((event) => `Success! Created ${attr.eventName}`);
};
