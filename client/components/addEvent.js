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
                <label> Event Name </label>
                <input type="text" className="form-control" />
              </div>

              <div className="form-group">
                <label for="foodType"> Food Type </label>
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
                <div  className="checkbox">
                <label>
                  <input type="checkbox" value="glutenFree" /> Gluten Free

                 <br />

                  <input type="checkbox" value="vegetarian" /> Vegetarian

                  <br />

                  <input type="checkbox" value="vegan" /> Vegan
                </label>
                </div>

              <div>
                <label> Description </label>
                <textarea className="form-control" rows="6" />
              </div>

              <div>
                <label> Price </label>
                <input type="text" className="form-control" />
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
                <label> End </label>
                <input type="datetime-local" className="form-control" />
              </div>

              <div>
                <label> Location </label>
                <input type="text" className="form-control" placeholder="Street Address" />
                <input type="text" className="form-control" placeholder="City" />
                <input type="text" className="form-control" placeholder="State" />
                <input type="number" className="form-control" placeholder="Zip Code" />
              </div>
            </fieldset>
          </form>

        </div>
      </div>
    );
  }
}
