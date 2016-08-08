const jwt = require('jsonwebtoken');

// route middleware to verify a token
module.exports.tokenCheck = function (req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    return jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
        // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      return next();
    });
  }
    // if there is no token
    // return an error
  return res.status(403).send({
    success: false,
    message: 'No token provided.',
  });
};
