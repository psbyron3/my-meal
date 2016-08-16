import { combineReducers } from 'redux';
import UserInfoReducer from './user_info_reducer';
import UserHistory from './user_history_reducer';
import MapReducer from './map_reducer';
import FilteredReducer from './filtered_events_reducer';
import SelectedEvent from './selected_event_reducer';
import AllEventsReducer from './all_events_reducer';
import AuthReducer from './auth_reducer';
import ChefEventsReducer from './chef_events_reducer';
import EventIdReducer from './event_id_reducer';
import CloseChatReducer from './close_chatBox_reducer';
import TagReducer from './tag_reducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  allEvents: AllEventsReducer,
  userInfo: UserInfoReducer,
  userHistory: UserHistory,
  map: MapReducer,
  filteredEvents: FilteredReducer,
  selectedEvent: SelectedEvent,
  auth: AuthReducer,
  chefEvents: ChefEventsReducer,
  eventId: EventIdReducer,
  form: formReducer,
  tags: TagReducer,
  boxStatus: CloseChatReducer,
});

export default rootReducer;
