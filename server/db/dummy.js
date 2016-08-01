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
    address: '604 Arizona avenue, Santa Monica',
    latitude: 34.016484,
    longitude: -118.496216,
    startDatetime: new Date(),
    endDatetime: new Date(),
  }).then(function (result) {
    console.log('created ', result.eventName);
  });

  Event.createEvent({
    eventName: 'Tacos Party',
    eventPic: 'http://mediad.publicbroadcasting.net/p/kwmu/files/201508/tacos.jpg',
    price: 5,
    maxGuests: 15,
    address: '418 Wilshire Blvd, Santa Monica, CA 90401',
    latitude: 34.019855,
    longitude: -118.497611,
    startDatetime: new Date(),
    endDatetime: new Date(),
  }).then(function (result) {
    console.log('created ', result.eventName);
  });
};
