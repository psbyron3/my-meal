var User = require('../models/UserModel.js');
var jwt = require('jsonwebtoken');

module.exports={
//**************************SIGN UP*****************************
	'/signup': {
    	get: function(req,res) {
      	console.log("Received GET at /api/auth/signup");
      	res.end("Received GET at /api/auth/signup but endpoint is not rendering anything");
    },
    	post: function(req, res) {
      		console.log("Received POST at /api/auth/signup");
      	
      		var newAccount = {
		        userName: req.body.userName,
		        password: req.body.password,
		        email: req.body.email,
		        firstName: req.body.firstName,
		        lastName: req.body.lastName,
		        address: req.body.address,
		        phoneNumber: req.body.phoneNumber
      		};

	      	User.findUserByEmail(newAccount.email)
        	.then(function(user) {    
          		console.log(user,"response from query")
          		if (user) {
            		console.log("user exists");
            		res.status(401).json({
              			message: "Cannot create user; user already exists"
            		})
            	} else {
            		console.log("user does not exist");
            		User.createUser(newAccount)
              		.then(function(user) {
                		console.log("result of creationUser", user);
                		console.log(process.env.secret, "process")
                		//do session id/jwt stuff                
                		var token = jwt.sign(user, process.env.secret, {
                    		expiresIn: 1440 * 60 
                  		});

                		delete user.password;
                		delete user.salt;

                		// return the information including token as JSON
                		res.json({
                  			token: token, 
                  			user: user
                			});
                		})
              			.catch(function(err) {
                			res.send(err);
              			});
        		}
			});
	    },

    put: function(req, res) {
      console.log("Received PUT at /api/auth/signup");
      res.end("Received PUT at /api/auth/signup");
    },
    delete: function(req, res) {
      console.log("Received DELETE at /api/auth/signup");
      res.end("Received DELETE at /api/auth/signup");
    }
  },

//******************** Login ******************************

'/login': {
    get: function(req,res) {
      console.log("Received GET at /api/auth/login");
      res.end("Received GET at /api/auth/login");
    },
    post: function(req, res) {
      console.log("Received POST at /api/auth/login");
      
      var email = req.body.email;
      var password = req.body.password;
      
      User.findUserByEmail(email)
        .then(function(user) {
          if (user) {
            console.log("user exists, checking pw");
            User.comparePasswords(user.password, password)
              .then(function(result) {
                if (result) {
                  console.log("passwords match");
                  //proceed with login methods
                  //
                  console.log("this is the user:", user);
                  console.log("this is the process.env.secret", process.env.secret);
                
                  var token = jwt.sign(user.dataValues, process.env.secret, {
                    		expiresIn: 1440 * 60 
                  });

                  console.log("token created:", token);

                  delete user.dataValues.password;
                  delete user.dataValues.salt;

                  // return the information including token as JSON
                  res.send({
                    token: token,
                    success: true,
                    message: "Success: password and user match",
                    user: user
                  });


                } else {
                  console.log("passwords do not match");

                  res.status(401).json({
                    success: false,
                    message: "Failure: Password does not match"
                  });
                  //throw error and have front end display warning
                }
              });
          } else {
            console.log("user does not exist");
            res.status(401).json({
              success: false,
              message: "Failure: user does not exist"
            });
            //redirect to signup page
          }
        });
    },
    put: function(req, res) {
      console.log("Received PUT at /api/auth/login");
      res.end("Received PUT at /api/auth/login");
    },
    delete: function(req, res) {
      console.log("Received DELETE at /api/auth/login");
      res.end("Received DELETE at /api/auth/login");
    }
  }


}