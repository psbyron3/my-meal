const User = require('../models/userModel.js');
const Event = require('../models/eventModel.js');
const Review = require('../models/reviewModel.js');
const Tag = require('../models/tagModel.js');

const Dummy = module.exports;

Dummy.init = function () {
  const allTagPromises = [
    Tag.createTag({ tagName: 'kosher', restriction: true }),
    Tag.createTag({ tagName: 'vegan', restriction: true }),
    Tag.createTag({ tagName: 'vegetarian', restriction: true }),
    Tag.createTag({ tagName: 'no fish or shellfish', restriction: true }),
    Tag.createTag({ tagName: 'gluten-free', restriction: true }),
    Tag.createTag({ tagName: 'soy- and nut-free', restriction: true }),
    Tag.createTag({ tagName: 'dairy-free', restriction: true }),
    Tag.createTag({ tagName: 'egg-free', restriction: true }),
    Tag.createTag({ tagName: 'Mexican', restriction: false }),
    Tag.createTag({ tagName: 'Italian', restriction: false }),
    Tag.createTag({ tagName: 'French', restriction: false }),
    Tag.createTag({ tagName: 'Spanish', restriction: false }),
    Tag.createTag({ tagName: 'Central American', restriction: false }),
    Tag.createTag({ tagName: 'Brazilian', restriction: false }),
    Tag.createTag({ tagName: 'Chinese', restriction: false }),
    Tag.createTag({ tagName: 'Korean', restriction: false }),
    Tag.createTag({ tagName: 'Japanese', restriction: false }),
    Tag.createTag({ tagName: 'Thai', restriction: false }),
    Tag.createTag({ tagName: 'Vietnamese', restriction: false }),
    Tag.createTag({ tagName: 'Filipino', restriction: false }),
    Tag.createTag({ tagName: 'Indian', restriction: false }),
    Tag.createTag({ tagName: 'Mediterranean', restriction: false }),
    Tag.createTag({ tagName: 'Ethiopian', restriction: false }),
    Tag.createTag({ tagName: 'Carribbean', restriction: false }),
    Tag.createTag({ tagName: 'Cajun', restriction: false }),
    Tag.createTag({ tagName: 'Soul Food', restriction: false }),
    Tag.createTag({ tagName: 'American Diner Food', restriction: false }),
    Tag.createTag({ tagName: 'Barbecue', restriction: false }),
    Tag.createTag({ tagName: 'Russian', restriction: false }),
    Tag.createTag({ tagName: 'Southern Food (U.S.)', restriction: false }),
    Tag.createTag({ tagName: 'Other African', restriction: false }),
    Tag.createTag({ tagName: 'Other European', restriction: false }),
    Tag.createTag({ tagName: 'Other Asian', restriction: false }),
    Tag.createTag({ tagName: 'Other South American', restriction: false })
  ];

  return Promise.all(allTagPromises)
    .then(() => {
      return User.createUser({
        userName: 'Joe',
        password: 'test',
        firstName: 'Joseph',
        lastName: 'italiano',
        email: 'joe@gmail.com',
        address: 'Roma',
        phoneNumber: '4159305687',
      }).then((result) => {
        console.log('created ', result.userName);
        return;
      }).then(() => {
        return User.createUser({
          userName: 'Nizz',
          password: 'test2',
          firstName: 'Nizar',
          lastName: 'france',
          email: 'nizz@gmail.com',
          address: 'Paris',
          phoneNumber: '4159345687',
        }).then((result) => {
          console.log('created ', result.userName);
          return;
        }).then(() => {
          return User.createUser({
            userName: 'Phil',
            password: 'test3',
            firstName: 'Phil',
            lastName: 'usa',
            email: 'phil@gmail.com',
            address: 'Santa',
            phoneNumber: '3259345687',
          }).then((result) => {
            console.log('created ', result.userName);
            return;
          }).then(() => {
            return User.createUser({
              userName: 'Mike',
              password: 'test4',
              firstName: 'Mike',
              lastName: 'Korea',
              email: 'mike@gmail.com',
              address: 'Seoul',
              phoneNumber: '3259342787',
            }).then((result) => {
              console.log('created ', result.userName);
              return;
            }).then(() => {
              // add dummy events
              return Event.createEvent({
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
              }).then((result) => {
                console.log('Made', result.eventName);
                return;
              }).then(() => {
                return Event.createEvent({
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
                }).then((result) => {
                  console.log(result.eventName);
                  return;
                }).then(() => {
                  return Event.createEvent({
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
                    console.log(result.eventName);
                    return;
                  }).then(() => {
                    return Event.createEvent({
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
                      userId: 3,
                    }).then((result) => {
                      console.log(result.eventName);
                      return;
                    }).then(() => {
                      Event.createEvent({
                        eventName: 'Hot Dog Async Party (...WUT?)',
                        eventPic: 'https://a.dilcdn.com/bl/wp-content/uploads/sites/8/2011/05/hot-dogs-chili11-480.jpg',
                        price: 0.00,
                        maxGuests: 20,
                        description: 'PWYW for some gourmet hot dogs in Santa Monica!',
                        address: '1314 10th Street Santa Monica, CA 90401',
                        latitude: 34.022006,
                        longitude: -118.490653,
                        startDatetime: '2016-08-18T18:00:00',
                        endDatetime: '2016-08-18T20:00:00',
                        userId: 1,
                      });

                      return Event.createEvent({
                        eventName: 'Hot Dog Eating (No Contest)',
                        eventPic: 'https://a.dilcdn.com/bl/wp-content/uploads/sites/8/2011/05/hot-dogs-chili11-480.jpg',
                        price: 0.00,
                        maxGuests: 20,
                        description: 'PWYW for some gourmet hot dogs!',
                        address: '1299 South Sycamore Avenue Los Angeles, CA 90019',
                        latitude: 34.049940,
                        longitude: -118.347645,
                        startDatetime: '2016-08-18T18:00:00',
                        endDatetime: '2016-08-18T20:00:00',
                        userId: 1,
                      }).then((result) => {
                        console.log(result.eventName);
                        return;
                      }).then(() => {
                        return Event.createEvent({
                          eventName: 'Biweekly Yum-a-thon',
                          eventPic: 'http://clv.h-cdn.co/assets/16/02/1452527843-vegetarian-pad-tha-2-2-600x900.jpg',
                          price: 7.00,
                          maxGuests: 10,
                          description: 'Biweekly Yum-a-thon',
                          address: '1345 South Redondo Boulevard Los Angeles, CA 90019',
                          latitude: 34.048887,
                          longitude: -118.349243,
                          startDatetime: '2016-08-07T18:00:00',
                          endDatetime: '2016-08-07T20:00:00',
                          userId: 2,
                        }).then((result) => {
                          console.log(result.eventName);
                          return;
                        }).then(() => {
                          // create tags


                          // add dummy reviews
                          Review.createReview({
                            content: 'Awsome cook',
                            rating: 5,
                            eventId: 2,
                            hostId: 3,
                            reviewerId: 1,
                          }).then((result) => {
                            console.log(result.dataValues.content);
                          });


                          Review.createReview({
                            content: 'Great cook',
                            rating: 5,
                            eventId: 3,
                            hostId: 1,
                            reviewerId: 2,
                          }).then((result) => {
                            console.log(result.dataValues.content);
                          });


                          Review.createReview({
                            content: 'So tasty',
                            rating: 5,
                            eventId: 4,
                            hostId: 1,
                            reviewerId: 3,
                          }).then((result) => {
                            console.log(result.dataValues.content);
                          });


                          Review.createReview({
                            content: 'Love it',
                            rating: 5,
                            eventId: 2,
                            hostId: 3,
                            reviewerId: 1,
                          }).then((result) => {
                            console.log(result.dataValues.content);
                          });


                          Review.createReview({
                            content: 'Lovely host',
                            rating: 5,
                            eventId: 1,
                            hostId: 2,
                            reviewerId: 1,
                          }).then((result) => {
                            console.log(result.dataValues.content);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
    })
  })
  .catch((err) => {
    console.log(err);
  });
};
