const db = require('../db/db.js');

const Review = module.exports;


// create review for event in attr
Review.createReview = function (attr) {
  return db.Review.create(attr)
    .then(function (result) {
      attr.id = result.dataValues.id;
      return result;
    });
};

// find one review based on review id
Review.findReviewById = function (reviewId) {
  return db.Review.findAll({ where: { reviewId } })
    .then(function (rows) {
      return rows[0];
    });
};

// find all reviews by a given reviwer id
Review.findReviewsByUser = function (reviewerId) {
  return db.Review.findAll({ where: { reviwerId: reviewerId } })
    .then(function (rows) {
      return rows;
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
