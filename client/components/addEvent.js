import React, { Component } from 'react';

export default class AddEvent extends Component {


  render() {
    return (
      <div className="top-margin">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <form className="form-hotizontal row col">
                <fieldset>
                  <h3>Create New Event</h3>
                  <div>
                    <label> Event Name </label>
                    <input type="text" className="form-control" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="foodType"> Food Type </label>
                    <select className="form-control" id="foodType">
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
                      <input className="form-check-input" type="checkbox" value="glutenFree" /> Gluten Free
                    </label>

                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" value="vegetarian" /> Vegetarian
                    </label>

                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" value="vegan" /> Vegan
                    </label>
                  </div>

                  <br />

                  <div>
                    <label> Description </label>
                    <textarea className="form-control" rows="6" />
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
                      <input type="text" className="form-control" />
                    </div>

                    <div className="col-md-3">
                      <label> Max Guests </label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>

                  <div>
                    <label className="form-check-inline">
                      <input className="form-check-input" type="checkbox" value="checked" /> Let Your Guests Decide!
                    </label>
                  </div>

                  <br />

                  <div className="row">
                    <div className="col-md-6">
                      <label> Start </label>
                      <input type="datetime-local" className="form-control" />
                    </div>

                    <div className="col-md-6">
                      <label> End </label>
                      <input type="datetime-local" className="form-control" />
                    </div>
                  </div>

                  <br />

                  <div>
                    <label> Location </label>
                    <input type="text" className="form-control" placeholder="Street Address" />
                    <br />
                    <div className="row">
                      <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="City" />
                      </div>
                      <div className="col-md-4">
                      <input type="text" className="form-control" placeholder="State" />
                      </div>
                      <div className="col-md-4">
                      <input type="number" className="form-control" placeholder="Zip Code" />
                      </div>
                    </div>
                  </div>

                  <br />

                  <div className="pull-right">
                    <button type="button" className="btn btn-outline-danger">Cancel</button>
                    <span> </span>
                    <button type="button" className="btn btn-outline-primary">Create</button>

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
