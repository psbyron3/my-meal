import React, { Component } from 'react';

export default class AddEvent extends Component {




  render() {
    return (
      <div className="top-margin">
        <div className="container">

          <form className="form-hotizontal">
          <fieldset>
            <h3>Create New Event</h3>
            <div>
              <label> Name </label>
              <input type="text" className="form-control" />
            </div>

            <div>
              <label> Description </label>
              <input type="text" className="form-control" />
            </div>

            <div>
              <label> Price </label>
              <input type="number" className="form-control" />
            </div>

            <div>
              <label> Max Guests </label>
              <input type="number" className="form-control" />
            </div>

            <div>
              <label> Start </label>
              <input type="datetime-local" className="form-control" />
            </div>

            <div>
              <label> Location </label>
              <input type="text" className="form-control" placeHolder="Street Address" />
              <input type="number" className="form-control" placeHolder="Zip Code" />
              <input type="text" className="form-control" placeHolder="State" />
            </div>
          </fieldset>
          </form>

        </div>
      </div>
    )
  }
}