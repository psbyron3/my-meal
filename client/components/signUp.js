import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
// import sign up action creator

class SignUp extends Component {

  onSubmit(props) {
    console.log(props);
    // sign up func
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
                    <fieldset>
                      <h3 className="form-signin-heading">Sign Up</h3>
                      <div className="text-help">
                        <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                          <input type="text" className="form-control" placeholder="Email Address" {...email} />
                        </div>

                        <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                          <input type="password" className="form-control" placeholder="Password" {...password} />
                        </div>

                      </div>
                      <button className="btn btn-md btn-primary btn-block" type="submit">Sign Up</button>
                      <div className="pull-right">
                        <Link to="signIn">Already have an account? Sign in here!</Link>
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

export default reduxForm({
  form: 'SignUpForm',
  fields: ['email',
           'password'],
  validate,
})(SignUp);
