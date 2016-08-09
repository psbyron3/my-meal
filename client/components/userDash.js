import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';


export default class UserDash extends Component {


  render() {
    return (
      <div>
        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
          <Tab eventKey={1} title="Event Feed">Check the events you've attended</Tab>
          <Tab eventKey={2} title="Upcoming">Check in for your future events</Tab>
          <Tab eventKey={3} title="Preferences">This is where the users manage their preferences</Tab>
        </Tabs>
      </div>

    );
  }
}
