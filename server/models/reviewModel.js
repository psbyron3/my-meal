const db = require('../db/db.js');
const User = require('./userModel.js');
const Review = module.exports;
const Event = require('./eventModel.js');


// create review for event in attr
Review.createReview = function (attr) {
  return Review.findReviewForEventbyUser(attr.eventId, attr.reviewerId)
    .then(() => {
      // console.log("review doesn't exist, creating now");
      return db.Review.create(attr)
        .then((result) => {
          const { eventId, reviewerId } = result.dataValues;
          return Review.findReviewsByChef(result.hostId)
            .then((reviews) => {
              return Review.updateAverage(reviews)
                .then((user) => {
                  return Event.findEventById(eventId)
                    .then((event) => {
                      return event.removeUsers([reviewerId])
                        .then((confirm) => {
                          return event.addUsers([reviewerId], {
                            role: 'guest',
                            wasReviewed: true,
                          })
                            .then(() => {
                              return Event.findEventsByUser(attr.reviewerId);
                            });
                        });
                    });
                });
            });
        });
    });
};

// find one review based on review id
Review.findReviewById = function (reviewId) {
  return db.Review.findAll({
    where: { reviewId },
    include: [
      {
        model: db.Event,
        as: 'event',
        attributes: [
          'eventName',
          'eventPic',
          'startDatetime',
          'endDatetime',
        ],
      },
    ],
  })
    .then((rows) => {
      return rows[0];
    });
};

// find all reviews by a given reviewer id
Review.findReviewsByUser = function (reviewerId) {
  return db.Review.findAll({
    where: { reviewerId },
    include: [
      {
        model: db.Event,
        as: 'event',
        attributes: [
          'eventName',
          'eventPic',
          'startDatetime',
          'endDatetime',
        ],
      },
    ],
  });
};

// find all reviews for a chef
Review.findReviewsByChef = function (chefId) {
  return db.Review.findAll({
    where: { hostId: chefId },
    include: [
      {
        model: db.Event,
        as: 'event',
        attributes: [
          'eventName',
          'eventPic',
          'startDatetime',
          'endDatetime',
        ],
      },
    ],
  });
};

// find all reviews for a given event id
Review.findReviewsByEvent = function (eventId) {
  return db.Review.findAll({ where: { eventId } })
    .then((rows) => {
      return rows;
    });
};

// find review for an event by a specific user
Review.findReviewForEventbyUser = function (eventId, reviewerId) {
  return db.Review.findAll({ where: { eventId, reviewerId } })
    .then((rows) => {
      return rows[0];
    });
};

Review.updateAverage = function (reviews) {
  const hostId = reviews[0].dataValues.hostId;
  const avg = reviews.reduce((total, curr) => {
    return total + curr.dataValues.rating;
  }, 0) / reviews.length;
  return db.User.findById(hostId)
    .then((user) => {
      return user.update({
        avgRating: avg,
      });
    });
};
