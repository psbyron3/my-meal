import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import ChefPast from '../containers/chefPast';
import ChefUpcoming from '../containers/chefUpcoming';

export default class ChefDash extends Component {


  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={1}
          animation={false} id="noanim-tab-example"
        >

          <Tab eventKey={1} title="Past Events">

            <div className="user-feed">
              list of past events
              <ChefPast />

            </div>

          </Tab>

          <Tab eventKey={2} title="Upcoming Events">

            <div>
              list of future events
              <ChefUpcoming />
            </div>

          </Tab>

        </Tabs>
      </div>
    );
  }
}
