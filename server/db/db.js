const path = require('path');
const Sequelize = require('sequelize');
const env = 'development';
const config = require('../../sqlConfig.js')[env];
const dummy = require('./dummy');

const sequelize = new Sequelize(config.database, config.user, config.password, config.connection);


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch(() => {
    console.log('Unable to connect to the database');
  });


const User = sequelize.define('User', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
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
  phoneNumber: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

const Event = sequelize.define('Event', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eventPic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL',
      },
    },
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(6, 2),
  },
  maxGuests: {
    type: Sequelize.INTEGER,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.DECIMAL(10, 7),
    allowNull: false,
  },
  longitude: {
    type: Sequelize.DECIMAL(10, 7),
    allowNull: false,
  },
  startDatetime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  endDatetime: {
    type: Sequelize.DATE,
    allowNull: false,
  },

});

const Tag = sequelize.define('Tag', {
  tagName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Dish = sequelize.define('Dish', {
  dishName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  dishPic: {
    type: Sequelize.STRING,
    validate: {
      isUrl: {
        msg: 'Must be a valid URL',
      },
    },
  },
});

const Review = sequelize.define('Review', {
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

const UsersEvent = sequelize.define('UsersEvent', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  eventId: {
    type: Sequelize.INTEGER,
  },
  role: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['guest', 'host']],
    },
  },
});


/** ********MANY TO MANY RELATIONSHIPS**********/
// join tables: events_dishes, users_tags, users_events, events_tags
Event.belongsToMany(Dish, { through: 'EventsDishes', foreignKey: 'eventId' });
Dish.belongsToMany(Event, { through: 'EventsDishes', foreignKey: 'dishId' });

User.belongsToMany(Event, { through: 'UsersEvent', foreignKey: 'userId' });
Event.belongsToMany(User, { through: 'UsersEvent', foreignKey: 'eventId' });

User.belongsToMany(Tag, { through: 'UsersTags', foreignKey: 'userId' });
Tag.belongsToMany(User, { through: 'UsersTags', foreignKey: 'tagId' });

Event.belongsToMany(Tag, { through: 'TagsEvents', foreignKey: 'eventId' });
Tag.belongsToMany(Event, { through: 'TagsEvents', foreignKey: 'tagId' });

/** ********ONE TO MANY RELATIONSHIPS**********/
// one in many: (1:many) users:dishes, events:reviews, users:reviews (two times)
Dish.belongsTo(User, { as: 'user', foreignKey: 'userId' });
User.hasMany(Dish, { foreignKey: 'userId' });

Review.belongsTo(Event, { as: 'event', foreignKey: 'eventId' });
Event.hasMany(Review, { foreignKey: 'eventId' });

Review.belongsTo(User, { as: 'host', foreignKey: 'hostId' });
User.hasMany(Review, { foreignKey: 'hostId' });

Review.belongsTo(User, { as: 'reviewer', foreignKey: 'reviewerId' });
User.hasMany(Review, { foreignKey: 'reviewerId' });


sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Created tables from schema');
    dummy.init();
  });

exports.User = User;
exports.Event = Event;
exports.Tag = Tag;
exports.Dish = Dish;
exports.Review = Review;
