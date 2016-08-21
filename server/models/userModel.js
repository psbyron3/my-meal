const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const Event = require('./eventModel.js');


const User = module.exports;

// Used to save enscrypted password to database
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

// Used to compare submitted pw to saved, hashed pw
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
    include: [
      {
        model: db.Tag,
      },
    ],
  });
};

User.findUserById = function (id) {
  console.log('user id is......******.....', id);
  return db.User.findAll({
    where: {
      id,
    },
    include: [
      {
        model: db.Tag,
      },
    ],
  }).then(function (rows) {
    return rows[0];
  });
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
  }).then(function (rows) {
    return rows[0];
  });
};

// Used in the Event.createEvent function only
User.addHostToEvent = function (event, userId) {
  console.log('inside userModel', userId, event);
  return db.User.findById(userId)
    .then((user) => {
      console.log(user, 'UUUUUUUUUSEEEER');
      console.log('User = ', user.userName);
      event.setUsers([user], { role: 'host' })
        .then(() => event);
    });
};

// To be used only by chef in order to see which users are attending.
// require authentication matching userId to hostId
// userId parameter is to be used only to check hostId and should be the id of the user making the request
User.findUsersByEvent = function (userId, eventId) {
  return db.Event.findById(eventId)
    .then((event) => {
      return event.getUsers();
    });
};

User.createUser = function (attr, tags = []) {
  console.log('creating user', attr);
  return new Promise(function (resolve, reject) {
    return hashPassword(attr.password)
      .then(function (hashObj) {
        attr.password = hashObj.hash;
        attr.salt = hashObj.salt;
      })
      .then(() => {
        console.log('password hashed');
        let newUser = Object.assign({}, attr, { avgRating: 0 });
        db.User.create(newUser)
          .then(function (result) {
            const output = result.dataValues;
            return result.setTags(tags)
              .then((x) => {
                return db.User.findById(output.id, {
                  include: db.Tag,
                })
                  .then((user) => {
                    console.log('user - - - - - - -', user);
                    resolve(user.dataValues);
                  });
              });
          });
      });
  });
};

User.editUser = function (attr, tags = [], userId) {
  console.log('editing user...', attr, tags, userId);
  return db.User.findById(userId)
    .then((user) => {
      return user.update(attr, {
        reset: false,
      })
        .then((updatedUser) => {
          console.log('result of updating user.....', updatedUser);
          return updatedUser.setTags(tags)
            .then((result) => {
              console.log('result of setting tags on update.....', result);
              return db.User.findById(userId, {
                include: {
                  model: db.Tag,
                },
              });
            });
        });
    });
};
