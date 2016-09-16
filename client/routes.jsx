import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home.jsx';
import Landing from './components/landing';
import SignIn from './containers/signIn';
import SignUp from './containers/signUp';
import AddEvent from './containers/addEvent';
import RequireAuth from './containers/require_auth';
import UserDash from './containers/userDash';
import ChefDash from './containers/chefDash.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="home" component={Home} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route path="addevent" component={RequireAuth(AddEvent)} />
    <Route path="userdash" component={RequireAuth(UserDash)} />
    <Route path="chefdash" component={RequireAuth(ChefDash)} />
  </Route>

);
