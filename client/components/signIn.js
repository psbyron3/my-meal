import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { SignInFunc } from '../actions/index';

class SignIn extends Component {

  onSubmit(props) {
    console.log(props);
    SignInFunc(props);
  }


  render() {
    const { fields: { email,
                      password,
                    }, handleSubmit } = this.props;

    return (
      <div className="top-margin">
        <div className="container">

          <div className="row">
            <div className="col-md-4 col-md-offset-4">

              <form className="form-signin" onSubmit={handleSubmit(this.onSubmit)}>
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

export default reduxForm({
  form: 'SignInForm',
  fields: ['email',
           'password'],
  validate,
})(SignIn);
