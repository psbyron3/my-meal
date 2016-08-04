import { combineReducers } from 'redux';
import UserInfoReducer from './user_info_reducer';
import UserHistory from './user_history_reducer';
import MapReducer from './map_reducer';
import FilteredReducer from './filtered_events_reducer';
import SelectedEvent from './selected_event_reducer';
import AllEventsReducer from './all_events_reducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  allEvents: AllEventsReducer,
  userInfo: UserInfoReducer,
  userHistory: UserHistory,
  map: MapReducer,
  filteredReducer: FilteredReducer,
  selectedEvent: SelectedEvent,
  form: formReducer
});

export default rootReducer;
