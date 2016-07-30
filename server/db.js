

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.db_db, process.env.db_user, process.env.db_pass, {
  host: 'https://mymeal.justinpchen.com',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully');
  })
  .catch(function () {
    console.log('Unable to connect to the database');
  });


const User = sequelize.define('user', {
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: {
        msg: 'Must be a valid email address',
      },
    },
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

const Event = sequelize.define('event', {
  event_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  event_pic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL',
      },
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  start_datetime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_datetime: {
    type: Sequelize.DATE,
    allowNull: false,
  },

});

const Tag = sequelize.define('tag', {
  tagname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Dish = sequelize.define('dish', {
  dish_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  dish_pic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL',
      },
    },
  },
});

const Review = sequelize.define('review', {
  content: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1,
    },
  },
});


// join tables: events_dishes, users_tags, users_events, events_tags
Event.belongsToMany(Dish, { through: 'event_dish', foreignKey: 'event_id' });
Dish.belongsToMany(Event, { through: 'event_dish', foreignKey: 'dish_id' });

User.belongsToMany(Event, { through: 'user_event', foreignKey: 'user_id' });
Event.belongsToMany(User, { through: 'user_event', foreignKey: 'event_id' });

User.belongsToMany(Tag, { through: 'user_tag', foreignKey: 'user_id' });
Tag.belongsToMany(User, { through: 'user_tag', foreignKey: 'tag_id' });

Event.belongsToMany(Tag, { through: 'event_tag', foreignKey: 'event_id' });
Tag.belongsToMany(Event, { through: 'event_tag', foreignKey: 'tag_id' });
// one in many: (1:many) users:dishes, events:reviews, users:reviews (two times)
User.hasMany(Dish, { foreignKey: 'user_id' });
Event.hasMany(Review, { foreignKey: 'event_id' });
User.hasMany(Review, { as: 'host', foreignKey: 'user_id' });
User.hasMany(Review, { as: 'reviewer', foreignKey: 'user_id' });
User.hasMany(Event, { as: 'host', foreignKey: 'host_user_id' });


sequelize
  .sync()
  .then(function () {
    console.log('Created tables from schema');
  });

exports.User = User;
exports.Event = Event;
exports.Tag = Tag;
exports.Dish = Dish;
exports.Review = Review;
