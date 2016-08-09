const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const Event = require('./eventModel.js');


const User = module.exports;

//Used to save enscrypted password to database
function hashPassword(pw) {
  console.log('hashing password', pw);
  return new Promise(function (resolve, reject, next) {
    return bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      return bcrypt.hash(pw, salt, function (error, hash) {
        if (error) {
          return next(error);
        }
        return resolve({
          salt,
          hash,
        });
      });
    });
  });
}

//Used to compare submitted pw to saved, hashed pw
User.comparePasswords = function (hashedPw, attempt) {
  return new Promise(function (resolve, reject) {
    return bcrypt.compare(attempt, hashedPw, function (err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
};


User.findUserByUsername = function (userName) {
  return db.User.findAll({
    where: {
      userName,
    },
  });
};

User.findUserById = function (id) {
  return db.User.findAll({
    where: {
      id,
    },
  });
};

User.findUserByEmail = function (email) {
  return db.User.findAll({
    where: {
      email,
    },
  }).then(function (rows) {
    return rows[0];
  });
};

//Used in the Event.createEvent function only
User.addHostToEvent = function (event, userId) {
  return db.User.findById(userId)
    .then((user) => {
      console.log('User = ', user.userName);
      event.setUsers([user], { role: 'host' })
        .then(() => event);
    });
};

User.createUser = function (attr) {
  console.log('creating user', attr);
  return new Promise(function (resolve, reject) {
    return hashPassword(attr.password)
      .then(function (hashObj) {
        attr.password = hashObj.hash;
        attr.salt = hashObj.salt;
      })
      .then(function () {
        console.log('password hashed');
        console.log('this is the pre inserted attr', attr);
        db.User.create(attr)
          .then(function (result) {
            const output = result.dataValues;
            console.log(output, 'aaaaaattttribut');
            resolve(output);
          });
      });
  });
};

//To be used only by chef in order to see which users are attending.
//require authentication matching userId to hostId
//userId parameter is to be used only to check hostId and should be the id of the user making the request
User.findUsersByEvent = function (userId, eventId) {
  return db.Event.findById(eventId)
    .then((event) => {
      return event.getUsers();
    });
};
