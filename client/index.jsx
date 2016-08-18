import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import { persistStore, autoRehydrate } from 'redux-persist';

import App from './components/app';
import reducers from './reducers';
import routes from './routes';

const createStoreWithMiddleware = applyMiddleware(thunk, promise)(createStore);

const store = createStoreWithMiddleware(reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f, autoRehydrate());

persistStore(store).purgeAll();


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app'));
