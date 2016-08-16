import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { editUser } from '../actions/index';


class UserEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(userAttr) {
    console.log('userAttr in UserEditProfile....', userAttr);
    editUser(userAttr);
  }

  render() {

    const {
      fields: { firstName, lastName, address, phoneNumber, email, Tags },
      handleSubmit,
      resetForm,
      initialValues,
    } = this.props;
    return (
      <div className="top-margin">
        <div className="container">

          <div className="row">
            <div className="col-md-10 col-md-offset-1">

              <div className="row">
                <div className="col-md-6 col-md-offset-3">

                  <form {...initialValues} className="form-edit" onSubmit={handleSubmit(this.onSubmit)}>
                    <fieldset>
                      <h3 className="form-edit-heading">Edit Personal Info</h3>
                      <br />
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

                        <div>
                          {this.props.restrictions.map((restriction) => {
                            return (
                              <div style={{ display: 'inline-block' }} key={restriction.id}>
                                <label className="checkboxLabel">
                                  <input
                                    type="checkbox"
                                    value={restriction.id}
                                    onChange={(event) => {
                                      if (event.target.checked ) {
                                        Tags.addField(event.target.value);
                                      } else {
                                        Tags.removeField(Tags.indexOf(event.target.value));
                                      }
                                    }}
                                  />
                                {restriction.tagName}
                                </label>
                              </div>
                            );
                          })}
                        </div>

                      </div>
                      <button className="btn btn-md btn-primary btn-block" type="submit">Update</button>
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

function mapStateToProps(state) {
  return {
    restrictions: state.tags.restrictions,
    initialValues: state.userInfo,
    userTags: state.userInfo.Tags
  };
}

export default reduxForm({
  form: 'UserEditProfile',
  fields: ['firstName',
           'lastName',
           'address',
           'phoneNumber',
           'email',
           'Tags[]'],
}, mapStateToProps)(UserEditProfile);
