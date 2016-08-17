import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { editUser } from '../actions/index';


class UserEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestrictions: [],
      submitted: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }

  componentWillMount() {
    this.setState({ selectedRestrictions: this.props.Tags.map(tag => tag.id) });
  }

  componentWillUnmount() {
    if (this.props.pristine) this.props.destroyForm();
  }

  onCheckChange(event) {
    const index = this.state.selectedRestrictions.indexOf(Number(event.target.value));
    const copy = this.state.selectedRestrictions.slice();
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(Number(event.target.value));
    }
    this.setState({ selectedRestrictions: copy });
  }

  onSubmit(userAttr) {
    const userUpdate = Object.assign({}, userAttr, { tags: this.state.selectedRestrictions });
    this.props.editUser(userUpdate)
      .then((response) => {
        this.setState({
          wasChecked: false,
          submitted: true,
        });
      })
      .catch((err) => {
        console.log('error in onSubmit in userEditProfile:', err);
      });
  }

  showSuccess() {
    return (<div>{this.state.submitted ? <p>User info updated</p> : <br />}</div>);
  }

  render() {
    const {
      fields: { firstName, lastName, address, phoneNumber, email },
      handleSubmit,
      resetForm,
      initialValues,
    } = this.props;
    console.log('state in edit profile...', this.state);
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
                      {this.showSuccess()}
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
                                    checked={this.state.selectedRestrictions.indexOf(restriction.id) > -1}
                                    onChange={this.onCheckChange}
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
  console.log('state.userInfo(initialValues....)', state.userInfo);
  return {
    restrictions: state.tags.restrictions,
    initialValues: state.userInfo,
    Tags: state.userInfo.Tags,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editUser }, dispatch);
}

UserEditProfile.propTypes = {
  pristine: PropTypes.bool,
  initializeForm: PropTypes.func,
  Tags: PropTypes.array,
  destroyForm: PropTypes.func,
  resetForm: PropTypes.func,
  editUser: PropTypes.func,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  restrictions: PropTypes.array,
};

export default reduxForm({
  form: 'UserEditProfile',
  fields: ['firstName',
           'lastName',
           'address',
           'phoneNumber',
           'email',
          ],
}, mapStateToProps, mapDispatchToProps)(UserEditProfile);
