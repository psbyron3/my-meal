import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/home.jsx';
import Landing from './components/landing';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import AddEvent from './components/addEvent';
import RequireAuth from './components/require_auth';
import UserDash from './components/userDash';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="home" component={Home} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route path="addevent" component={RequireAuth(AddEvent)} />
    <Route path="addevent" component={AddEvent} />
    <Route path="dashboard" component={UserDash} />
  </Route>

);
