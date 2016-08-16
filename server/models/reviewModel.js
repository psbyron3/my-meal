const db = require('../db/db.js');
const User = require('./userModel.js');
const Review = module.exports;
const Event = require('./eventModel.js');


// create review for event in attr
Review.createReview = function (attr) {
  return Review.findReviewForEventbyUser(attr.eventId,attr.reviewerId)
    .then (() => {
      console.log("review doesn't exist, creating now");
      return db.Review.create(attr)
        .then(function (result) {
          attr.id = result.dataValues.id;
            return result;
        }).then ((result) => {
          const eventId = result.dataValues.eventId
          const reviewerId = result.dataValues.reviewerId
          return Review.findReviewsByChef(result.hostId)
        .then((reviews) => {
          return Review.updateAverage(reviews)
        .then ((user) => {
          return Event.findEventById(eventId)
        .then ((event) => {
          return event.removeUsers([reviewerId])
        .then((confirm) => {
          return event.addUsers([reviewerId], {
            role: 'guest',
            wasReviewed: true,
          })
      })
      })
      })
      })
      })
  })
};

// find one review based on review id
Review.findReviewById = function (reviewId) {
  return db.Review.findAll({ where: { reviewId } })
    .then(function (rows) {
      return rows[0];
    });
};

// find all reviews by a given reviewer id
Review.findReviewsByUser = function (reviewerId) {
  return db.Review.findAll({ where: { reviewerId } })
    .then(function (rows) {
      return rows;
    });
};

// find all reviews for a chef
Review.findReviewsByChef = function (chefId) {
  return db.Review.findAll({
    where: {
      hostId: chefId,
    },
  })
    .then((results) => {
      console.log('results of findReviewsByChef:', results);
      return results;
    });
};

// find all reviews for a given event id
Review.findReviewsByEvent = function (eventId) {
  console.log('inside review model', eventId);
  return db.Review.findAll({ where: { eventId } })
    .then(function (rows) {
      return rows;
    });
};

// find review for an event by a specific user
Review.findReviewForEventbyUser = function (eventId, reviewerId) {
  return db.Review.findAll({ where: { eventId, reviewerId } })
    .then(function (rows) {
      return rows[0];
    });
};

Review.updateAverage = function (reviews) {
  const hostId = reviews[0].dataValues.hostId;
  console.log('hostId in updateAverage is--------->', hostId);
  const sum = reviews.reduce((total, curr) => {
    return total + curr.dataValues.rating;
  }, 0);
  console.log('sum in updateAverage is....', sum);
  const avg = sum / reviews.length;
  console.log('avg in updateAverage is...', avg);
  return db.User.findById(hostId)
    .then((user) => {
      console.log('updating average on this user...', user.dataValues);
      return user.update({
        avgRating: avg,
      });
    });
};
