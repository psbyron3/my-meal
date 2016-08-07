var path = require('path');
var config = require('./envConfig.js');

module.exports = {

  development: {
    user     : process.env.db_username, 
    password : process.env.db_password,
    database : 'mymeal_db',
    connection: {
    	host     : 'mymeal.justinpchen.com',
    	dialect: 'mysql',
    },
    charset  : 'utf8'
  }
};

