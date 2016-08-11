import React, { Component } from 'react';

import DashEvent from './userDashEvent.jsx';
import { getEventsByUserId } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import moment from 'moment';

import { Tabs, Tab } from 'react-bootstrap';

const userId = window.localStorage.userId;

class UserDash extends Component {


  // componentWillMount() {
  //   console.log("in component will mount ")
  //   this.props.getEventsByUserId(userId);
  // }

  renderList() {
    const startTime = moment(this.props.userHistory.startDatetime).format('MMMM Do YYYY, h:mm a');
    const endTime = moment(this.props.userHistory.endDatetime).format('MMMM Do YYYY, h:mm a');

    if (!this.props.userHistory.length) {
      return (<div>Join Events to populate this page!</div>);
    }
    return this.props.userHistory.filter((event) => event.UsersEvent.role === 'guest')
    .map((event) => {
      return (
        <DashEvent
          key={event.id}
          index={event.id}
          image={event.eventPic}
          eventName={event.eventName}
          address={event.address}
          times={`${startTime} to ${endTime}`}
          description={event.description}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Tabs
          defaultActiveKey={1}
          animation={false} id="noanim-tab-example"
        >
          <Tab eventKey={1} title="Dashboard">
            This is where the user will have their pic and events they need to
            still comment on.
          </Tab>
          <Tab eventKey={2} title="Preferences">
            This is where the users manage their preferences
          </Tab>
          <Tab eventKey={3} title="Your Meals">
            <div className="user-feed">
            {this.renderList()}
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('Events by User Id : ', state.userHistory);
  return {
    userHistory: state.userHistory,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getEventsByUserId }, dispatch);
// }

export default connect(mapStateToProps)(UserDash);
