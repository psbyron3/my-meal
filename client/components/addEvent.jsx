import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createEvent } from '../actions/index';
import FileInput from 'react-file-input';

class AddEvent extends Component {

  onSubmit(props) {
    console.log(props);
    props.address += ', ';
    createEvent(props);
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
    // const eventName = this.props.fields.eventName;
    // const handleSubmit = this.props.handleSubmit;

    return (
      <div className="top-margin">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <form className="form-hotizontal row col" onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <h3>Create New Event</h3>
                  <div className={`form-group ${eventName.touched && eventName.invalid ? 'has-danger' : ''}`}>
                    <label> Event Name </label>
                    <input type="text" className="form-control" {...eventName} />
                    <div className="text-help">
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
                        <div style={{ display: 'inline-block' }} >
                          <label
                            key={restriction.id}
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

                  <label> Select a Picture </label>
                  <div>
                    <label className="custom-file">
                      <FileInput
                        name="myImage"
                        accept=".jpeg"
                        placeholder="insert a dish picture"
                        className="input-file"
                        {...picture}
                      />
                    </label>
                  </div>

                  <br />

                  <div className="row">

                    <div>
                      <div className="col-md-3">
                        <label> Price </label>
                        <input type="number" className="form-control" {...price} />
                      </div>

                      <div className="col-md-3">
                        <label> Max Guests </label>
                        <input type="number" className="form-control" {...maxGuest} />
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
                        <div className="text-help">
                          {start.touched ? start.error : ''}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className={`form-group ${end.touched && end.invalid ? 'has-danger' : ''}`}>
                        <label> End </label>
                        <input type="datetime-local" className="form-control" {...end} />
                        <div className="text-help">
                          {end.touched ? end.error : ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />

                  <div>

                    <label> Location </label>
                    <div className="text-help">
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

                        <div className={`form-group ${zip.touched && zip.invalid ? 'has-danger' : ''}`}>
                          <div className="col-md-4">
                            <input type="number" className="form-control" placeholder="Zip Code" {...zip} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="text-help col-md-4">
                       {city.touched ? city.error : ''}
                      </div>

                      <div className="text-help col-md-4">
                       {usState.touched ? usState.error : ''}
                      </div>

                      <div className="text-help col-md-4">
                       {zip.touched ? zip.error : ''}
                      </div>
                    </div>

                  </div>

                  <br />

                  <div className="pull-right">
                    <button type="submit" className="btn btn-outline-danger">Cancel</button>
                    <span> </span>
                    <button type="submit" className="btn btn-outline-primary">Create</button>

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

  if (!values.start) {
    errors.start = 'Please enter a start time';
  }

  if (!values.end) {
    errors.end = 'Please enter an end time';
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

  if (!values.zip) {
    errors.zip = 'Enter zip code';
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
