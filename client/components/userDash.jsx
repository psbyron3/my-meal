import React, { Component } from 'react';
import DashEvent from './userDashEvent.jsx';

import { Tabs, Tab } from 'react-bootstrap';


export default class UserDash extends Component {


  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={1}
          animation={false} id="noanim-tab-example"
        >
          <Tab eventKey={1} title="Event Feed">
            <div className="user-feed">
              <DashEvent />
            </div>
          </Tab>
          <Tab eventKey={2} title="Preferences">
            This is where the users manage their preferences
          </Tab>
        </Tabs>
      </div>

    );
  }
}
