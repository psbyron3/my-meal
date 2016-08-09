const User = require('../models/userModel.js');
const Event = require('../models/eventModel.js');
const url = require('url');
// var Q = require('q');

module.exports = {
  '/': {
    get(req, res) {
      console.log('Received GET at /api/user/');
      res.end('Received GET at /api/user/');
    },
    post(req, res) {
      console.log('Received POST at /api/user/');
      res.end('Received POST at /api/user/');
    },
    put(req, res) {
      console.log('Received PUT at /api/user/');
      res.end('Received PUT at /api/user/');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/user/');
      res.end('Received DELETE at /api/user/');
    },
  },
  '/events/:userId': {
    get(req, res) {
      const userId = url.parse(req.url, true).path.slice(8);
      console.log('userId is:', userId);
      Event.findEventsByGuest(userId)
        .then((results) => {
          res.send(results);
        });
      console.log('Received GET at /api/user/events/:userId');
    },
    post(req, res) {
      console.log('Received POST at /api/user/events/:userId');
      res.end('Received POST at /api/user/events/:userId');
    },
    put(req, res) {
      console.log('Received PUT at /api/user/events/:userId');
      res.end('Received PUT at /api/user/events/:userId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/user/events/:userId');
      res.end('Received DELETE at /api/user/events/:userId');
    },
  },
  '/:userId': {
    get(req, res) {
      console.log('Received GET at /api/:userId');
      res.end('Received GET at /api/:userId');
    },
    post(req, res) {
      console.log('Received POST at /api/:userId');
      res.end('Received POST at /api/:userId');
    },
    put(req, res) {
      console.log('Received PUT at /api/:userId');
      res.end('Received PUT at /api/:userId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/:userId');
      res.end('Received DELETE at /api/:userId');
    },
  },
};
