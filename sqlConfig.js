var path = require('path');

module.exports = {

  development: {
    user     : process.env.db_username, 
    password : process.env.db_password,
    database : 'phils_db',
    connection: {
    	host     : 'mymeal.justinpchen.com',
    	dialect: 'mysql',
    },
    charset  : 'utf8'
  }
};
