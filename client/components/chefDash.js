import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// import ChefPast from '../containers/chefPast';

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

            </div>

          </Tab>

          <Tab eventKey={2} title="Upcoming Events">

            <div>
              list of future events

            </div>

          </Tab>

        </Tabs>
      </div>
    );
  }
}
