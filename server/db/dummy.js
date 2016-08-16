const User = require('../models/userModel.js');
const Event = require('../models/eventModel.js');
const Review = require('../models/reviewModel.js');
const Tag = require('../models/tagModel.js');
const Message = require('../models/messageModel.js');

const Dummy = module.exports;

Dummy.init = function () {
  const allTagPromises = [
    Tag.createTag({ id: 1, tagName: 'kosher', restriction: true }),
    Tag.createTag({ id: 2, tagName: 'halal', restriction: true }),
    Tag.createTag({ id: 3, tagName: 'vegan', restriction: true }),
    Tag.createTag({ id: 4, tagName: 'vegetarian', restriction: true }),
    Tag.createTag({ id: 5, tagName: 'no fish or shellfish', restriction: true }),
    Tag.createTag({ id: 6, tagName: 'gluten-free', restriction: true }),
    Tag.createTag({ id: 7, tagName: 'soy- and nut-free', restriction: true }),
    Tag.createTag({ id: 8, tagName: 'dairy-free', restriction: true }),
    Tag.createTag({ id: 9, tagName: 'egg-free', restriction: true }),
    Tag.createTag({ id: 10, tagName: 'Mexican', restriction: false }),
    Tag.createTag({ id: 11, tagName: 'Italian', restriction: false }),
    Tag.createTag({ id: 12, tagName: 'French', restriction: false }),
    Tag.createTag({ id: 13, tagName: 'Spanish', restriction: false }),
    Tag.createTag({ id: 14, tagName: 'Central American', restriction: false }),
    Tag.createTag({ id: 15, tagName: 'Brazilian', restriction: false }),
    Tag.createTag({ id: 16, tagName: 'Chinese', restriction: false }),
    Tag.createTag({ id: 17, tagName: 'Korean', restriction: false }),
    Tag.createTag({ id: 18, tagName: 'Japanese', restriction: false }),
    Tag.createTag({ id: 19, tagName: 'Thai', restriction: false }),
    Tag.createTag({ id: 20, tagName: 'Vietnamese', restriction: false }),
    Tag.createTag({ id: 21, tagName: 'Filipino', restriction: false }),
    Tag.createTag({ id: 22, tagName: 'Indian', restriction: false }),
    Tag.createTag({ id: 23, tagName: 'Mediterranean', restriction: false }),
    Tag.createTag({ id: 24, tagName: 'Ethiopian', restriction: false }),
    Tag.createTag({ id: 25, tagName: 'Carribbean', restriction: false }),
    Tag.createTag({ id: 26, tagName: 'Cajun', restriction: false }),
    Tag.createTag({ id: 27, tagName: 'Soul Food', restriction: false }),
    Tag.createTag({ id: 28, tagName: 'American Diner Food', restriction: false }),
    Tag.createTag({ id: 29, tagName: 'Barbecue', restriction: false }),
    Tag.createTag({ id: 30, tagName: 'Russian', restriction: false }),
    Tag.createTag({ id: 31, tagName: 'Southern Food (U.S.)', restriction: false }),
    Tag.createTag({ id: 32, tagName: 'Other African', restriction: false }),
    Tag.createTag({ id: 33, tagName: 'Other European', restriction: false }),
    Tag.createTag({ id: 34, tagName: 'Other Asian', restriction: false }),
    Tag.createTag({ id: 35, tagName: 'Other South American', restriction: false }),
  ];

  return Promise.all(allTagPromises)
    .then(() => {
      const allUserPromises = [
        User.createUser({
          userName: 'Joe',
          password: 'test',
          firstName: 'Joseph',
          lastName: 'italiano',
          email: 'joe@gmail.com',
          address: 'Roma',
          phoneNumber: '4159305687',
          userPic: 'https://avatars3.githubusercontent.com/u/12257623?v=3&s=460',
        }, [4, 6]),
        User.createUser({
          userName: 'Nizz',
          password: 'test2',
          firstName: 'Nizar',
          lastName: 'france',
          email: 'nizz@gmail.com',
          address: 'Paris',
          phoneNumber: '4159345687',
          userPic: 'https://avatars0.githubusercontent.com/u/17601607?v=3&s=460',
        }),
        User.createUser({
          userName: 'Phil',
          password: 'test3',
          firstName: 'Phil',
          lastName: 'usa',
          email: 'phil@gmail.com',
          address: 'Santa',
          phoneNumber: '3259345687',
          userPic: 'https://avatars1.githubusercontent.com/u/17244224?v=3&s=460',
        }, [8]),
        User.createUser({
          userName: 'Mike',
          password: 'test4',
          firstName: 'Mike',
          lastName: 'Korea',
          email: 'mike@gmail.com',
          address: 'Seoul',
          phoneNumber: '3259342787',
          userPic: 'https://avatars0.githubusercontent.com/u/14685419?v=3&s=400',
        }),
      ];

      return Promise.all(allUserPromises)
        .then(() => {
          const allEventPromises = [
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
              tags: [12],
            }),
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
              tags: [10],
            }),
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
              tags: [10],
            }),
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
              userId: 3,
              tags: [1, 5, 19],
            }),
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
              tags: [27],
            }),
            Event.createEvent({
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
              tags: [27],
            }),
            Event.createEvent({
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
              tags: [4, 8, 19],
            }),
          ];
          return Promise.all(allEventPromises)
            .then(() => {
              // create dummy messages
              const allMessagePromises = [
                Message.createMessage({
                  content: 'Hello world',
                  userId: 1,
                  eventId: 1,
                }),
                Message.createMessage({
                  content: 'Hello world',
                  userId: 1,
                  eventId: 1,
                }),
                Message.createMessage({
                  content: 'Hello world',
                  userId: 1,
                  eventId: 1,
                }),
                Message.createMessage({
                  content: 'Hello world',
                  userId: 1,
                  eventId: 1,
                }),
              ];

              return Promise.all(allMessagePromises)
                .then(() => {
                      // add dummy reviews
                  const allReviewPromises = [
                    Review.createReview({
                      content: 'Awsome cook',
                      rating: 5,
                      eventId: 2,
                      hostId: 3,
                      reviewerId: 1,
                    }),
                    Review.createReview({
                      content: 'Great cook',
                      rating: 5,
                      eventId: 3,
                      hostId: 1,
                      reviewerId: 2,
                    }),
                    Review.createReview({
                      content: 'So tasty',
                      rating: 5,
                      eventId: 4,
                      hostId: 1,
                      reviewerId: 3,
                    }),
                    Review.createReview({
                      content: 'Love it',
                      rating: 5,
                      eventId: 2,
                      hostId: 3,
                      reviewerId: 1,
                    }),
                    Review.createReview({
                      content: 'Lovely host',
                      rating: 5,
                      eventId: 1,
                      hostId: 2,
                      reviewerId: 1,
                    }),
                  ];

                  return Promise.all(allReviewPromises)
                    .then(() => {
                      const allGuestPromises = [
                        Event.joinEvent(7, 1),
                        Event.joinEvent(3, 3),
                        Event.joinEvent(3, 1),
                        Event.joinEvent(1, 2),
                        Event.joinEvent(1, 4),
                      ];

                      return Promise.all(allGuestPromises);
                    });
                });
            });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
