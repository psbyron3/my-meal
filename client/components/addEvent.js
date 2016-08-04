import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createEvent } from '../actions/index';

class AddEvent extends Component {

  onSubmit(props) {
    console.log(props);
    createEvent(props);
      // after creating new event, navigate user to index
      // navigate by calling this.context.router.push
      // with path endpoint of where to navigate to

      // instead of that ^ we actually need to
      // search and center map on event on submit
  }


  render() {
    const { fields: { eventName,
                      foodType,
                      glutenFree,
                      vegetarian,
                      vegan,
                      description,
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
                  <div>
                    <label> Event Name </label>
                    <input type="text" className="form-control" {...eventName} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="foodType"> Food Type </label>
                    <select className="form-control" id="foodType" {...foodType} value={foodType.value || ''}>
                      <option value="french">French</option>
                      <option value="mexican">Mexican</option>
                      <option value="japanese">Japanese</option>
                      <option value="chinese">Chinese</option>
                      <option value="southen">Southern</option>
                      <option value="italian">Italian</option>
                    </select>
                  </div>

                  <label> Other Preference : </label>
                  <div>
                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" {...glutenFree} /> Gluten Free
                    </label>

                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" {...vegetarian} /> Vegetarian
                    </label>

                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" {...vegan} /> Vegan
                    </label>
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
                      <input type="file" id="file" className="custom-file-input" />
                      <span className="custom-file-control" />
                    </label>
                  </div>

                  <br />

                  <div className="row">
                    <div className="col-md-2">
                      <label> Price </label>
                      <input type="number" className="form-control" {...price} />
                    </div>

                    <div className="col-md-3">
                      <label> Max Guests </label>
                      <input type="number" className="form-control" {...maxGuest} />
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
                      <label> Start </label>
                      <input type="datetime-local" className="form-control" {...start} />
                    </div>

                    <div className="col-md-6">
                      <label> End </label>
                      <input type="datetime-local" className="form-control" {...end} />
                    </div>
                  </div>

                  <br />

                  <div>
                    <label> Location </label>
                    <input type="text" className="form-control" placeholder="Street Address" {...address} />
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="City" {...city} />
                      </div>
                      <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="State" {...usState} />
                      </div>
                      <div className="col-md-4">
                        <input type="number" className="form-control" placeholder="Zip Code" {...zip} />
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

export default reduxForm({
  form: 'AddEventForm',
  fields: ['eventName',
           'foodType',
           'glutenFree',
           'vegetarian',
           'vegan',
           'description',
           'price',
           'maxGuest',
           'guestDecide',
           'start',
           'end',
           'address',
           'city',
           'usState',
           'zip'],
}, null, { createEvent })(AddEvent);

//

