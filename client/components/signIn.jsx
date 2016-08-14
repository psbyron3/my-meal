import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { SignInFunc, SignOutFunc } from '../actions/index';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    console.log('PROOOOOPR', props);
    this.props.SignInFunc(props);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      console.log(this.props.errorMessage, 'HELLOOOOOOOOOOOOOO');
      return (
        <div className="alert alert-danger">
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
    return null;
  }


  render() {
    const { fields: { email,
                      password,
                    }, handleSubmit } = this.props;

    return (
      <div className="top-margin">
        <div className="container">

          <div className="row">
            <div className="col-md-10 col-md-offset-1">

              <div className="row">
                <div className="col-md-6 col-md-offset-3">

                  <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                      {this.renderAlert()}
                    </div>
                    <fieldset>
                      <h3 className="form-signin-heading">Sign In</h3>
                      <div className="text-help">

                        <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                          <input type="text" className="form-control" placeholder="Email Address" {...email} />
                        </div>

                        <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                          <input type="password" className="form-control" placeholder="Password" {...password} />
                        </div>

                      </div>
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

        </div>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter valid email';
  }

  if (!values.password) {
    errors.password = 'Please enter password';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error, // from rootReducer (index.js in reducers),
    signIn: state.auth,
  };
};

export default reduxForm({
  form: 'SignInForm',
  fields: ['email',
           'password'],
  validate,
}, mapStateToProps, { SignInFunc, SignOutFunc })(SignIn);
