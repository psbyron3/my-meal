const Tag = require('../models/tagModel.js');
const Event = require('../models/eventModel.js');
const url = require('url');

module.exports = {
  '/': {
    get(req, res) {
      return Tag.getAllTags()
        .then((tags) => {
          res.send(tags);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/search');
      res.end('Received POST at /api/search');
    },
    put(req, res) {
      console.log('Received PUT at /api/search');
      res.end('Received PUT at /api/search');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/search');
      res.end('Received DELETE at /api/search');
    },
  },
  '/event/:eventId': {
    get(req, res) {
      console.log('Received GET at /api/tag/:eventId');
      res.end('Received GET at /api/tag/:eventId');
    },
    post(req, res) {
      console.log('Received POST at /api/tag/:eventId');
      res.end('Received POST at /api/tag/:eventId');
    },
    put(req, res) {
      const eventId = url.parse(req.url, true).path.slice(7);
      const userId = req.body.userId;
      console.log('Received PUT at /api/tag/:eventId');
      return Event.findEventById(eventId)
        .then((event) => {
          return Tag.addTagsToEvent(event, userId)
            .then((result) => {
              res.send(result);
            });
        });
    },
    delete(req, res) {
      const eventId = url.parse(req.url, true).path.slice(7);
      const userId = req.body.userId;
      console.log('Received DELETE at /api/tag/:eventId');
      return Event.findEventById(eventId)
        .then((event) => {
          Tag.removeTagsFromEvent(event, userId)
            .then((result) => {
              res.send(result);
            });
        });
    },
  },
  '/users/:userId': {
    get(req, res) {
      const userId = url.parse(req.url, true).path.slice(7);
      return Tag.getTagsByUser(userId)
        .then((result) => {
          res.send(result);
        });
    },
    post(req, res) {
      console.log('Received POST at /api/search');
      const userId = url.parse(req.url, true).path.slice(7);
      return Tag.addTagsToUser(req.body.tags, userId)
        .then((results) => {
          res.send(results);
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/search');
      res.end('Received PUT at /api/search');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/search');
      res.end('Received DELETE at /api/search');
    },
  },
};
