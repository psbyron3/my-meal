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
import MessageBox from './components/messageBox';
import ChefDash from './components/chefDash.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="home" component={Home} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route path="messbox" component={MessageBox} />
    <Route path="addevent" component={RequireAuth(AddEvent)} />
    <Route path="dashboard" component={RequireAuth(UserDash)} />
    <Route path="chefdash" component={RequireAuth(ChefDash)} />
  </Route>

);
