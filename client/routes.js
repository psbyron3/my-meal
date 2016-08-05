import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home.jsx';
import Landing from './components/landing';
import SignIn from './components/signIn';
import AddEvent from './components/addEvent';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="home" component={Home} />
    <Route path="signIn" component={SignIn} />
    <Route path="addEvent" component={AddEvent} />
  </Route>

);
