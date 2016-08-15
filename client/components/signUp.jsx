import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { SignUpFunc } from '../actions/index';
import $ from 'jquery';
import { fileinput } from 'bootstrap-fileinput';
import ProfilePic from './profilePic';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    console.log('ON SUBMIT');
    SignUpFunc(props, this.state.file);
  }

  onHandleSubmit(e) {
    this.setState({ file: e });
  }

  render() {
    const { fields: {
                      firstName,
                      lastName,
                      address,
                      phoneNumber,
                      email,
                      userName,
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
                      <br />

                      <ProfilePic onValueChange={this.onHandleSubmit} />

                      <div className="text-help">
                        <div className={`form-group ${firstName.touched && firstName.invalid ? 'has-danger' : ''}`}>
                          <label>First Name</label>
                          <input type="text" className="form-control" {...firstName} />
                        </div>

                        <div className={`form-group ${lastName.touched && lastName.invalid ? 'has-danger' : ''}`}>
                          <label>Last Name</label>
                          <input type="text" className="form-control" {...lastName} />
                        </div>

                        <div className={`form-group ${address.touched && address.invalid ? 'has-danger' : ''}`}>
                          <label>Address</label>
                          <input type="text" className="form-control" {...address} />
                        </div>

                        <div className={`form-group ${phoneNumber.touched && phoneNumber.invalid ? 'has-danger' : ''}`}>
                          <label>Phone Number</label>
                          <input type="text" className="form-control" {...phoneNumber} />
                        </div>

                        <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
                          <label>Email Address</label>
                          <input type="text" className="form-control" {...email} />
                        </div>

                        <div className={`form-group ${userName.touched && userName.invalid ? 'has-danger' : ''}`}>
                          <label>Username</label>
                          <input type="text" className="form-control" {...userName} />
                        </div>

                        <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
                          <label>Password</label>
                          <input type="password" className="form-control" {...password} />
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

  if (!values.firstName) {
    errors.firstName = 'Please enter first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Please enter last name';
  }

  if (!values.address) {
    errors.address = 'Please enter a valid address';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Please enter a phone number';
  }

  if (!values.email) {
    errors.email = 'Please enter valid email';
  }

  if (!values.userName) {
    errors.userName = 'Plesae enter username';
  }

  if (!values.password) {
    errors.password = 'Please enter password';
  }

  return errors;
};

SignUp.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default reduxForm({
  form: 'SignUpForm',
  fields: [
    'firstName',
    'lastName',
    'address',
    'phoneNumber',
    'email',
    'userName',
    'password'],
  validate,
})(SignUp);
