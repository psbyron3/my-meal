const db = require('../db/db.js');
const bcrypt = require('bcrypt');


const User = module.exports;

User.findUserByUsername = function (username) {
  return; // sequelize
};

User.findUserById = function (id) {
  return; // sequelize
};

User.findUserByEmail = function (email) {
  return; // sequelize
};

User.createUser = function (attr) {
  console.log('creating user');
  return new Promise(function (resolve, reject) {
    return hashPassword(attr.password)
      .then(function (hashObj) {
        attr.password = hashObj.hash;
        attr.salt = hashObj.salt;
      })
      .then(function () {
        console.log('password hashed');
        console.log('this is the pre inserted attr', attr);
        return db.User.create(attr)
          .then(function (result) {
            attr.id = result.dataValues.id;
            resolve(attr);
          });
      });
  });

  function hashPassword(pw) {
    console.log('hashing password');
    return new Promise(function (resolve, reject) {
      return bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(pw, salt, function (err, hash) {
          if (err) {
            return next(err);
          }
          resolve({
            salt,
            hash,
          });
        });
      });
    });
  }
};
