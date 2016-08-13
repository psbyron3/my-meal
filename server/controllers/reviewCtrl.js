const Review = require('../models/reviewModel.js');
const Event = require('../models/eventModel.js');
const url = require('url');

module.exports = {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/review');
      res.end('Received GET at /api/review');
    },
    post(req, res) {
      console.log('Received POST at /api/review');
      console.log('creating review');

      console.log(req.body);
      const newReview = req.body;
      delete newReview.token;

      Review.findReviewForEventbyUser(newReview.contentId, newReview.reviewerId)
        .then((review) => {
          if (review) {
            console.log('review for event ', newReview.contentId, ' by user', newReview.reviewerId, 'already exists');
          } else {
            console.log("review doesn't exist, creating now");
            Review.createReview(newReview)
              .then((result) => {
                console.log('result', result);

                res.status(201).json({ success: 'true' });
              });
          }
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/:review');
      res.end('Received PUT at /api/:review');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/:review');
      res.end('Received DELETE at /api/:review');
    },
  },
  '/event/:eventId': {
    get(req, res) {
      console.log('Received GET at /api/review/event/:eventId');

      const eventId = url.parse(req.url, true).path.split('/event/')[1];

      console.log('getting all reviews for event: ', eventId);

      Review.findReviewsByEvent(eventId)
        .then((reviews) => {
          console.log('these are the reviews', reviews);
          if (reviews.length === 0) {
            console.log('reviews do not exist');
            res.end('Received GET at /api/review/event/:eventId');
          } else {
            console.log('there are reviews, return them');
            res.send(reviews);
          }
        });
    },
    post(req, res) {
      console.log('Received POST at /api/review/event/:eventId');
      res.end('Received POST at /api/:reviewId');
    },
    put(req, res) {
      console.log('Received PUT at /api/review/event/:eventId');
      res.end('Received PUT at /api/:reviewId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/review/event/:eventId');
      res.end('Received DELETE at /api/review/event/:eventId');
    },
  },

};
