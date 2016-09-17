const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const Event = require('./eventModel.js');


const User = module.exports;

// Used to save enscrypted password to database
function hashPassword(pw) {
  // console.log('hashing password', pw);
  return new Promise((resolve, reject, next) => (
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      return bcrypt.hash(pw, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        return resolve({
          salt,
          hash,
        });
      });
    })
  ));
}

// Used to compare submitted pw to saved, hashed pw
User.comparePasswords = function (hashedPw, attempt) {
  return new Promise((resolve, reject) => (
    bcrypt.compare(attempt, hashedPw, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    })
  ));
};


User.findUserByUsername = function (userName) {
  return db.User.findAll({
    where: {
      userName,
    },
    include: [
      {
        model: db.Tag,
      },
    ],
  });
};

User.findUserById = function (id) {
  // console.log('user id is......******.....', id);
  return db.User.findAll({
    where: {
      id,
    },
    include: [
      {
        model: db.Tag,
      },
    ],
  })
  .then((rows) => rows[0]);
};

User.findUserByEmail = function (email) {
  return db.User.findAll({
    where: {
      email,
    },
    include: [
      {
        model: db.Tag,
      },
    ],
  }).then((rows) => rows[0]);
};

// Used in the Event.createEvent function only
User.addHostToEvent = function (event, userId) {
  return db.User.findById(userId)
    .then((user) => {
      // console.log('User = ', user.userName);
      event.setUsers([user], { role: 'host' })
        .then(() => event);
    });
};

// To be used only by chef in order to see which users are attending.
// require authentication matching userId to hostId
// userId parameter is to be used only to check hostId and should be the id of the user making the request
User.findUsersByEvent = function (userId, eventId) {
  return db.Event.findById(eventId)
    .then((event) => event.getUsers());
};

User.createUser = function (attr, tags = []) {
  // console.log('creating user', attr);
  return new Promise((resolve, reject) => (
    hashPassword(attr.password)
      .then((hashObj) => {
        attr.password = hashObj.hash;
        attr.salt = hashObj.salt;
      })
      .then(() => {
        // console.log('password hashed');
        const newUser = Object.assign({}, attr, { avgRating: 0 });
        db.User.create(newUser)
        .then((result) => {
          const output = result.dataValues;
          return result.setTags(tags)
          .then((x) => (
            db.User.findById(output.id, {
              include: db.Tag,
            })
          ))
          .then((user) => {
            resolve(user.dataValues);
          });
        });
      })
  ));
};

User.editUser = (attr, tags = [], userId) => (
  // console.log('editing user...', attr, tags, userId);
  db.User.findById(userId)
    .then((user) => user.update(attr, { reset: false }))
    .then((updatedUser) => updatedUser.setTags(tags))
    .then((result) => (
      db.User.findById(userId,
        {
          include: { model: db.Tag },
        })
    ))
);
