var path = require('path');

module.exports = {

  development: {
    user     : process.env.db_username,
    password : process.env.db_password,
    database : 'mymeal_db',
    connection: {
    	host:'mymeal.justinpchen.com',
    	dialect: 'mysql',
        timezone:"-07:00"
    },
    charset  : 'utf8'
  }
};
