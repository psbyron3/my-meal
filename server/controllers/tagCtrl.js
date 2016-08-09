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
  '/:eventId': {
    get(req, res) {
      console.log('Received GET at /api/tag/:eventId');
      res.end('Received GET at /api/tag/:eventId');
    },
    post(req, res) {
      console.log('Received POST at /api/tag/:eventId');
      res.end('Received POST at /api/tag/:eventId');
    },
    put(req, res) {
      const eventId = url.parse(req.url, true).path.slice(1);
      const userId = req.body.userId;
      return Event.findEventById(eventId)
        .then((event) => Tag.addTagsToEvent(event, userId)
          .then((result) => {
            res.send(result);
          });
        );
      console.log('Received PUT at /api/tag/:eventId');
      res.end('Received PUT at /api/tag/:eventId');
    },
    delete(req, res) {
      const eventId = url.parse(req.url, true).path.slice(1);
      const userId = req.body.userId;
      return Event.findEventById(eventId)
        .then((event) => Tag.removeTagsFromEvent(event, userId)
          .then((result) => {
            res.send(result);
          });
        );
      console.log('Received DELETE at /api/tag/:eventId');
      res.end('Received DELETE at /api/tag/:eventId');
    },
  }
}
