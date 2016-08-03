const Dish = require('../models/dishModel.js');
const url = require('url');

module.exports = {
  '/:userId': {
    get(req, res) {
      const userId = url.parse(req.url, true).path.slice(1);
      console.log('Received GET at /api/dish/:userId');
      Dish.findDishesByUserId(userId)
        .then((dishes) => {
          if (dishes) {
            return res.send(dishes);
          }
          return res.end(`dishes for ${userId} not found`);
        });
    },
    post(req, res) {
      const userId = url.parse(req.url, true).path.slice(1);
      console.log('Received GET at /api/dish/:userId');
      const newDish = {
        dishName: req.body.dishName,
        dishPic: req.body.dishPic,
        userId,
      };
      Dish.createDish(newDish)
        .then((dish) => {

        })
        .catch((err) => {
          console.log(err);
        });
    },
    put(req, res) {
      console.log('Received GET at /api/dish/:userId');
    },
    delete(req, res) {
      const userId = url.parse(req.url, true).path.slice(1);
      console.log('Received GET at /api/dish/:userId');
    },
  },

};
