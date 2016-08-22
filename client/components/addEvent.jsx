import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { createEvent } from '../actions/index';
import FileInput from 'react-file-input';
import ProfilePic from './profilePic';

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };

    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(props) {
    const newEvent = props;
    newEvent.tags = [...newEvent.tags, newEvent.genre];
    props.address += ', ';
    this.props.createEvent(props, this.state.file);
  }

  onHandleSubmit(e) {
    this.setState({ file: e });
  }

  render() {
    const { fields: { eventName,
                      genre,
                      tags,
                      description,
                      picture,
                      price,
                      maxGuest,
                      guestDecide,
                      start,
                      end,
                      address,
                      city,
                      usState,
                      zip,
                    }, handleSubmit } = this.props;

    return (
      <div className="top-margin">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <form className="form-horizontal row col" onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <h3>Create New Event</h3>

                  <ProfilePic onValueChange={this.onHandleSubmit} />

                  <div className={`form-group ${eventName.touched && eventName.invalid ? 'has-danger' : ''}`}>
                    <label> Event Name </label>
                    <input type="text" className="form-control" {...eventName} />
                    <div className="text-help" style={{ color: 'red' }}>
                      {eventName.touched ? eventName.error : ''}
                    </div>
                  </div>

                  <br />

                  <div className="form-group">
                    <label htmlFor="genre"> Food Type </label>
                    <select className="form-control" id="genre" {...genre} value={genre.value || ''}>
                      <option></option>
                      {this.props.genres.map((genreItem) => {
                        return (
                          <option key={genreItem.id} value={genreItem.id}>
                            {genreItem.tagName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <label> Other Preference : </label>

                  <div>
                    {this.props.restrictions.map((restriction) => {
                      return (
                        <div key={restriction.id} style={{ display: 'inline-block' }} >
                          <label

                            className="checkboxLabel form-check-inline"
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={restriction.id}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  tags.addField(event.target.value);
                                } else {
                                  tags.removeField(tags.indexOf(event.target.value));
                                }
                              }}
                            />
                          {restriction.tagName}
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <br />

                  <div>
                    <label> Description </label>
                    <textarea className="form-control" rows="6" {...description} />
                  </div>

                  <br />

                  <div className="row">

                    <div>
                      <div className="col-md-4">
                        <div className={`form-group ${price.touched && price.invalid ? 'has-danger' : ''}`}>
                          <label> Price </label>
                          <input type="number" min="0" className="form-control" {...price} />
                          <div className="text-help" style={{ color: 'red' }}>
                            {price.touched ? price.error : ''}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className={`form-group ${maxGuest.touched && maxGuest.invalid ? 'has-danger' : ''}`}>
                          <label> Max Guests </label>
                          <input type="number" min="0" className="form-control" {...maxGuest} />
                          <div className="text-help" style={{ color: 'red' }}>
                            {maxGuest.touched ? maxGuest.error : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" {...guestDecide} /> Let Your Guests Decide!
                    </label>
                  </div>

                  <br />

                  <div className="row">
                    <div className="col-md-6">
                      <div className={`form-group ${start.touched && start.invalid ? 'has-danger' : ''}`}>
                        <label> Start </label>
                        <input type="datetime-local" className="form-control" {...start} />
                        <div className="text-help" style={{ color: 'red' }}>
                          {start.touched ? start.error : ''}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className={`form-group ${end.touched && end.invalid ? 'has-danger' : ''}`}>
                        <label> End </label>
                        <input type="datetime-local" className="form-control" {...end} />
                        <div className="text-help" style={{ color: 'red' }}>
                          {end.touched ? end.error : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />

                  <div>

                    <label> Location </label>
                    <div className="text-help" style={{ color: 'red' }}>
                      <div className={`form-group ${address.touched && address.invalid ? 'has-danger' : ''}`}>
                        <input type="text" className="form-control" placeholder="Street Address" {...address} />
                        {address.touched ? address.error : ''}
                      </div>
                    </div>

                    <div className="row">
                      <div>
                        <div className={`form-group ${city.touched && city.invalid ? 'has-danger' : ''}`}>
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="City" {...city} />
                          </div>
                        </div>

                        <div className={`form-group ${usState.touched && usState.invalid ? 'has-danger' : ''}`}>
                          <div className="col-md-4">
                            <input type="text" className="form-control" placeholder="State" {...usState} />
                          </div>
                        </div>


                        <div className="col-md-4">
                          <input type="number" min="10000" className="form-control" placeholder="Zip Code" {...zip} />
                        </div>

                      </div>
                    </div>

                    <div className="row">
                      <div className="text-help col-md-4" style={{ color: 'red' }}>
                       {city.touched ? city.error : ''}
                      </div>

                      <div className="text-help col-md-4" style={{ color: 'red' }}>
                       {usState.touched ? usState.error : ''}
                      </div>
                    </div>

                  </div>

                  <br />

                  <div className="pull-right">
                    <Link to="/"><button type="submit" className="btn btn-outline-danger">Cancel</button></Link>
                    <span> </span>
                    <button className="btn btn-outline-primary">Create</button>

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

const priceChecker = (num) => {
  const clone = num;
  const decimals = clone.toString().split('.')[1].length;
  return decimals > 2;
};

const validate = (values) => {
  const errors = {};

  if (!values.eventName) {
    errors.eventName = 'Please enter an event name';
  }

  if (!values.price) {
    errors.price = 'Please enter valid price';
  }

  if (!values.maxGuest) {
    errors.maxGuest = 'Please enter a valid number of guests';
  }

  if (!values.start) {
    errors.start = 'Please enter a valid start time';
  }

  if (values.start && Date.parse(new Date()) > Date.parse(values.start)) {
    errors.start = 'Please enter a valid start time';
  }

  if (!values.end) {
    errors.end = 'Please enter a valid end time';
  }

  if (values.end && (Date.parse(values.end) < Date.parse(values.start)
    || Date.parse(new Date()) > Date.parse(values.end))) {
    errors.end = 'Please enter a valid end time';
  }

  if (!values.address) {
    errors.address = 'Enter a valid address';
  }

  if (!values.city) {
    errors.city = 'Enter a city';
  }

  if (!values.usState) {
    errors.usState = 'Enter a state';
  }

  return errors;
};

function mapStateToProps(state) {
  return {
    restrictions: state.tags.restrictions,
    genres: state.tags.genres,
  };
}

AddEvent.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  restrictions: PropTypes.array,
  genres: PropTypes.array,
  createEvent: PropTypes.func,
};

export default reduxForm({
  form: 'AddEventForm',
  fields: ['eventName',
           'genre',
           'tags[]',
           'description',
           'picture',
           'price',
           'maxGuest',
           'guestDecide',
           'start',
           'end',
           'address',
           'city',
           'usState',
           'zip',
          ],
  validate,
}, mapStateToProps, { createEvent })(AddEvent);
