const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

module.exports = {
//* *************************SIGN UP*****************************
  '/signup': {
    get(req, res) {
      console.log('Received GET at /api/auth/signup');
      res.end('Received GET at /api/auth/signup but endpoint is not rendering anything');
    },
    post(req, res) {
      console.log('Received POST at /api/auth/signup');
      console.log(req.body, 'BOOOOOOOOOOOOOOODY');
      const newAccount = {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        userPic: req.body.userPic,
      };
      const tags = req.body.tags || [];

      User.findUserByEmail(newAccount.email)
        .then(function (user) {
          console.log(user, 'response from query');
          if (user) {
            console.log('user exists');
            res.status(401).json({
              message: 'Cannot create user; user already exists',
            });
          } else {
            console.log('user does not exist');
            User.createUser(newAccount, tags)
              .then((result) => {
                console.log('result of creationUser', result);
                console.log(process.env.secret, 'process');
                // do session id/jwt stuff
                const token = jwt.sign(result, process.env.secret, {
                  expiresIn: 1440 * 60,
                });
                console.log('tokeeeeeeeeeeeen', token);
                delete result.password;
                delete result.salt;

                // return the information including token as JSON
                res.json({
                  token,
                  result,
                });
              })
              .catch(function (err) {
                res.send(err);
              });
          }
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/auth/signup');
      res.end('Received PUT at /api/auth/signup');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/auth/signup');
      res.end('Received DELETE at /api/auth/signup');
    },
  },

//* ******************* Login ******************************

  '/login': {
    get(req, res) {
      console.log('Received GET at /api/auth/login');
      res.end('Received GET at /api/auth/login');
    },
    post(req, res) {
      console.log('Received POST at /api/auth/login');

      const email = req.body.email;
      const password = req.body.password;

      User.findUserByEmail(email)
        .then(function (user) {
          if (user) {
            console.log('user exists, checking pw');
            User.comparePasswords(user.password, password)
              .then(function (result) {
                if (result) {
                  console.log('passwords match');
                  // proceed with login methods
                  //
                  console.log('this is the user:', user);
                  console.log('this is the process.env.secret', process.env.secret);

                  const token = jwt.sign(user.dataValues, process.env.secret, {
                    expiresIn: 1440 * 60,
                  });

                  console.log('token created:', token);

                  delete user.dataValues.password;
                  delete user.dataValues.salt;

                  // return the information including token as JSON
                  res.send({
                    token,
                    success: true,
                    message: 'Success: password and user match',
                    user,
                  });
                } else {
                  console.log('passwords do not match');

                  res.status(401).json({
                    success: false,
                    message: 'Failure: Password does not match',
                  });
                  // throw error and have front end display warning
                }
              });
          } else {
            console.log('user does not exist');
            res.status(401).json([{
              success: false,
              message: 'Failure: user does not exist',
            }]);
            // redirect to signup page
          }
        });
    },
    put(req, res) {
      console.log('Received PUT at /api/auth/login');
      res.end('Received PUT at /api/auth/login');
    },
    delete(req, res) {
      console.log('Received DELETE at /api/auth/login');
      res.end('Received DELETE at /api/auth/login');
    },
  },


};
