const db = require('../db/db.js');

const Dish = module.exports;

Dish.createDish = function (newDish) {
  return db.Dish.create(newDish)
    .then((dish) => {
      console.log('');
    });
};

Dish.findDishById = function (dishId) {
  return db.Dish.findOne({
    where: {
      id: dishId,
    },
  });
};

Dish.findDishesByUserId = function (userId) {
  return db.Dish.findAll({
    where: {
      userId,
    },
  });
};

Dish.destroyDish = function (dish) {
  return dish.destroy();
};
