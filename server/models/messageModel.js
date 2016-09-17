const db = require('../db/db.js');
const User = require('../models/userModel.js');

const Message = module.exports;


// add a message to an event in attr
Message.createMessage = function (attr) {
  return User.findUserById(attr.userId).then(result => {
    attr.userName = result.dataValues.userName;
    return attr;
  }).then(() => (
    db.Message.create(attr)
      .then(result => result.dataValues)
  ));
};

// find all reviews for a given event id
Message.findMessagesByEventId = function (eventId) {
  // console.log('inside message model', eventId);
  return db.Message.findAll({
    where: {
      eventId,
    },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['userPic'],
      },
    ],
  })
  .then((rows) => rows)
  .catch((err) => err);
};
