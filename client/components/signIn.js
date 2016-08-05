import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

export default class SignIn extends Component {
  render() {
    return (
      <div className="top-margin">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <form className="form-signin">
                <fieldset>
                  <h3 className="form-signin-heading">Sign In</h3>
                  <input type="text" className="form-control" placeholder="Email Address" />

                  <input type="password" className="form-control" placeholder="Password" />

                  <button className="btn btn-md btn-primary btn-block" type="submit">Login</button>
                  <div className="pull-right">
                    <Link to="signUp">New user? Sign up here!</Link>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
