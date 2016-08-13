import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import ChefPast from '../containers/chefPast';
import ChefUpcoming from '../containers/chefUpcoming';
import ChefInfo from '../containers/chefInfo';
import { ChefEventsFunc } from '../actions/index';


class ChefDash extends Component {

  componentDidMount() {
    this.props.ChefEventsFunc();
  }


  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={1}
          animation={false} id="noanim-tab-example"
        >

          <Tab eventKey={1} title="Chef Info">

            <div className="user-feed">
              chef info
              <ChefInfo />

            </div>

          </Tab>

          <Tab eventKey={2} title="Past Events">

            <div className="user-feed">
              list of past events
              <ChefPast />

            </div>

          </Tab>

          <Tab eventKey={3} title="Upcoming Events">

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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { ChefEventsFunc })(ChefDash);
