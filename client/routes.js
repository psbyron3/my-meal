import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/home.jsx';
import Landing from './components/landing';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import AddEvent from './components/addEvent';
import RequireAuth from './components/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="home" component={Home} />
    <Route path="signIn" component={SignIn} />
    <Route path="signUp" component={SignUp} />
    <Route path="addEvent" component={RequireAuth(AddEvent)} />
  </Route>

);
