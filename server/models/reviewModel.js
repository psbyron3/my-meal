const db = require('../db/db.js');
const User = require('./userModel.js');
const Review = module.exports;
const Event = require('./eventModel.js');


// create review for event in attr
Review.createReview = function (attr) {
  return Review.findReviewForEventbyUser(attr.eventId, attr.reviewerId)
    .then(() => db.Review.create(attr)
      // console.log("review doesn't exist, creating now");
      .then((result) => {
        const { eventId, reviewerId } = result.dataValues;
        return Review.findReviewsByChef(result.hostId)
        .then((reviews) => (
          Review.updateAverage(reviews)
          .then((user) => (
            Event.findEventById(eventId)
            .then((event) => (
              event.removeUsers([reviewerId])
              .then((confirm) => (
                event.addUsers([reviewerId],
                  {
                    role: 'guest',
                    wasReviewed: true,
                  })
                .then(() => Event.findEventsByUser(attr.reviewerId))
              ))
            ))
          ))
        ));
      })
  );
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
  .then((rows) => rows[0]);
};

// find all reviews by a given reviewer id
Review.findReviewsByUser = function (reviewerId) {
  // console.log('reviewerId in Review model findReviewsByUser...', reviewerId);
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
  })
  .catch((err) => (err));
      // console.log('err in findReviewsByUser.....', err);
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
  })
  .catch((err) => (err));
      // console.log('error in findReviewsByChef', err);
};

// find all reviews for a given event id
Review.findReviewsByEvent = (eventId) => (
  db.Review.findAll({ where: { eventId } })
    .then((rows) => rows)
);

// find review for an event by a specific user
Review.findReviewForEventbyUser = (eventId, reviewerId) => (
  db.Review.findAll({ where: { eventId, reviewerId } })
  .then((rows) => rows[0])
);

Review.updateAverage = function (reviews) {
  const hostId = reviews[0].dataValues.hostId;
  const avg = reviews.reduce((total, curr) => total + curr.dataValues.rating, 0) / reviews.length;
  return db.User.findById(hostId)
    .then((user) => (
      user.update({
        avgRating: avg,
      })
    ));
};
