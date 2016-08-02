const User = require('../models/userModel.js');
const Event = require('../models/eventModel.js');

const Dummy = module.exports;

Dummy.init = function () {
  // add dummy users:
  User.createUser({
    userName: 'Joe',
    password: 'test',
    firstName: 'Joseph',
    lastName: 'italiano',
    email: 'joe@gmail.com',
    address: 'Roma',
    phoneNumber: '4159305687',
  }).then(function (result) {
    console.log('created ', result.userName);
  });

  User.createUser({
    userName: 'Nizz',
    password: 'test2',
    firstName: 'Nizar',
    lastName: 'france',
    email: 'nizz@gmail.com',
    address: 'Paris',
    phoneNumber: '4159345687',
  }).then(function (result) {
    console.log('created ', result.userName);
  });

  User.createUser({
    userName: 'Phil',
    password: 'test3',
    firstName: 'Phil',
    lastName: 'usa',
    email: 'phil@gmail.com',
    address: 'Santa',
    phoneNumber: '3259345687',
  }).then(function (result) {
    console.log('created ', result.userName);
  });

  User.createUser({
    userName: 'Mike',
    password: 'test4',
    firstName: 'Mike',
    lastName: 'Korea',
    email: 'mike@gmail.com',
    address: 'Seoul',
    phoneNumber: '3259342787',
  }).then(function (result) {
    console.log('created ', result.userName);
  });

  // add dummy events
  Event.createEvent({
    eventName: 'Boeuf Bourguignon on fire',
    eventPic: 'http://icu.linter.fr/750/10002051/1603680841/boeuf-bourguignon.jpg',
    price: 'pay what you want',
    maxGuests: 4,
    description: 'A startling display of fire!',
    address: '604 Arizona avenue, Santa Monica',
    latitude: 34.016484,
    longitude: -118.496216,
    startDatetime: new Date(),
    endDatetime: new Date(),
    userId: 1,
  }).then(function (result) {
    console.log(result);
  });

  Event.createEvent({
    eventName: 'Tacos Party',
    eventPic: 'http://mediad.publicbroadcasting.net/p/kwmu/files/201508/tacos.jpg',
    price: 5.00,
    maxGuests: 15,
    description: 'A party for tacos, by tacos',
    address: '418 Wilshire Blvd, Santa Monica, CA 90401',
    latitude: 34.019855,
    longitude: -118.497611,
    startDatetime: new Date(),
    endDatetime: new Date(),
    userId: 2,
  }).then(function (result) {
    console.log(result);
  });

  Event.createEvent({
    eventName: 'Carne Asada Cookout',
    eventPic: 'http://tipsforbbq.com/Include/Images/Recipes/Carne-Asada/AndrewLLoydSriracha.1024.jpg',
    price: 0.00,
    maxGuests: 20,
    description: 'The cookout to end all cookouts',
    address: '1349 South Redondo Blvd, Los Angeles, CA 90019',
    latitude: 34.0487404,
    longitude: -118.3515677,
    startDatetime: '2016-08-14T18:00:00',
    endDatetime: '2016-08-14T20:00:00',
    userId: 2,
  }).then((result) => {
    console.log(result);
  });

  Event.createEvent({
    eventName: 'Vegetarian Feast',
    eventPic: 'http://clv.h-cdn.co/assets/16/02/1452527843-vegetarian-pad-tha-2-2-600x900.jpg',
    price: 7.00,
    maxGuests: 10,
    description: 'The best vegetarian food in southern California',
    address: '1289 South Redondo Blvd, Los Angeles, CA 90019',
    latitude: 34.0505127,
    longitude: -118.3491435,
    startDatetime: '2016-08-07T18:00:00',
    endDatetime: '2016-08-07T20:00:00',
    userId: 2,
  }).then((result) => {
    console.log(result);
  });
};
