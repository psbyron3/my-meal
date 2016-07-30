

var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.db_database, process.env.db_user, process.env.db_password, {
  host: 'https://mymeal.justinpchen.com',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully');
  })
  .catch(function() {
    console.log('Unable to connect to the database');
  });


var User = sequelize.define('user', {
  user_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address'
      }
    },
    allowNull: false
  },
  address: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

var Event = sequelize.define('event', {
  event_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  event_pic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL';
      }
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  start_datetime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_datetime: {
    type: Sequelize.DATE,
    allowNull: false
  }

});

var Tag = sequelize.define('tag', {
  tagname: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Dish = sequelize.define('dish', {
  dish_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  dish_pic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL'
      }
    }
  }
});

var Review = sequelize.define('review', {
  content: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1
    }
  }
});


//join tables: events_dishes, users_tags, users_events, events_tags
//one in many: (1:many) users:dishes, events:reviews, users:reviews (two times)
//one to one: user:event_host_id

sequelize
  .sync()
  .then(function() {
      console.log("Created tables from schema");
  });

  exports.User = User;
  exports.Event = Event;
  exports.Tag = Tag;
  exports.Dish = Dish;
  exports.Review = Review;
