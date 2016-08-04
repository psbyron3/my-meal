import SELECT_EVENT from '../actions/index.js';
const initialState = {
  id: 2,
  eventName: 'Tacos Party',
  eventPic: 'http://mediad.publicbroadcasting.net/p/kwmu/files/201508/tacos.jpg',
  description: 'A party for tacos, by tacos',
  price: 5,
  maxGuests: 15,
  address: '418 Wilshire Blvd, Santa Monica, CA 90401',
  latitude: 34.019855,
  longitude: -118.497611,
  startDatetime: '2016-08-05T18:58:41.000Z',
  endDatetime: '2016-08-05T20:58:41.000Z',
  createdAt: '2016-08-03T20:58:41.000Z',
  updatedAt: '2016-08-03T20:58:41.000Z',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_EVENT:
      return action.payload;
    default:
      return state;
  }
}
