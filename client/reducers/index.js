import { combineReducers } from 'redux';
import AllEventsReducer from './all_events_reducer';
import UserInfoReducer from './user_info_reducer';
import UserHistory from './user_history_reducer';
import MapReducer from './map_reducer';
import SelectedEvent from './selected_event_reducer';
import AuthReducer from './auth_reducer';
import ChefEventsReducer from './chef_events_reducer';
import EventIdReducer from './event_id_reducer';
import TagReducer from './tag_reducer';
import CloseChatReducer from './close_chatBox_reducer';
import Review from './review_reducer';
import { reducer as FormReducer } from 'redux-form';


const rootReducer = combineReducers({
  allEvents: AllEventsReducer,
  userInfo: UserInfoReducer,
  userHistory: UserHistory,
  map: MapReducer,
  selectedEvent: SelectedEvent,
  auth: AuthReducer,
  chefEvents: ChefEventsReducer,
  eventId: EventIdReducer,
  tags: TagReducer,
  boxStatus: CloseChatReducer,
  review: Review,
  form: FormReducer,
});

export default rootReducer;
