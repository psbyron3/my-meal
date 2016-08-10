const Message = require('../models/messageModel.js');
const url = require('url');

module.exports = {
  '/:eventId': {
    get(req, res) {
      console.log('Received GET at /api/message/:eventId');

      const eventId = url.parse(req.url, true).path.split('/message/')[0][1];

      console.log('getting all messages for event: ', eventId);

      Message.findMessagesByEventId(eventId)
        .then(function (messages) {
          console.log('these are the messages', messages);
          if (messages.length === 0) {
            console.log('messages do not exist');
            res.end('No messages for this event: ', eventId);
          } else {
            console.log('there are messages, return them');
            res.send(messages);
          }
        });
    },
    post(req, res) {
      console.log('Received POST at /api/message/:eventId');

      const newMess = {
        content: req.body.content,
        userId: req.body.userId,
        eventId: req.body.eventId,
      };

      Message.createMessage(newMess)
        .then((message) => {
          console.log(message, 'inside messageCtrl');
        })
        .catch((err) => {
          console.log(err);
        });

      res.end('Received POST at /api/message/:eventId');
    },
    put(req, res) {
      console.log('Received PUT at /api/message/:eventId');
      res.end('Received PUT at /api/message/:eventId');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/message/:eventId');
      res.end('Received DELETE at /api/message/:eventId');
    },
  },

};

