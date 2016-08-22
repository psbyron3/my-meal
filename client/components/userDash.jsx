import React, { Component, PropTypes } from 'react';
import DashEvent from './userDashEvent.jsx';
import UserDashView from './userDashView';
import UserEditProfile from './userEditProfile';
import ReviewList from './userReviewList';
import { getEventsByUserId, ChatBoxFunc } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import MessageBox from './messageBox';

import { Tabs, Tab } from 'react-bootstrap';

const userId = window.localStorage.userId;
const now = moment().format();

class UserDash extends Component {


  componentWillUnmount() {
    this.props.ChatBoxFunc('false');
  }


  renderList() {
    // console.log('Times in UD: ', this.props.userHistory.startDatetime);

    if (!this.props.userHistory.length) {
      return (<div>Join Events to populate this page!</div>);
    }
    return this.props.userHistory.filter((event) => event.UsersEvent.role === 'guest' && event.startDatetime >= now)
      .map((event) => {
        const startTime = moment(event.startDatetime, ['YYYY', moment.ISO_8601]).format('MMMM DD YYYY, hh:mm A');
        const endTime = moment(event.endDatetime, ['YYYY', moment.ISO_8601]).format('hh:mm A');
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
        <div>
          {this.props.boxStatus === 'true' ? <MessageBox /> : null}
        </div>
        <Tabs
          defaultActiveKey={1}
          animation={false}
          id="noanim-tab-example"
        >
          <Tab eventKey={1} title="Dashboard">
            <UserDashView setHoverEvent={this.setHoverEvent} />
          </Tab>
          <Tab eventKey={2} title="Your Meals">
            <div className="user-feed">
            {this.renderList()}
            </div>
          </Tab>
          <Tab eventKey={3} title="Your Reviews">
            <ReviewList />
          </Tab>
          <Tab eventKey={4} title="Preferences">
            <UserEditProfile />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStoP Events by User Id : ', state.userHistory);
  return {
    userHistory: state.userHistory,
    boxStatus: state.boxStatus.status,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getEventsByUserId }, dispatch);
// }

UserDash.propTypes = {
  userHistory: PropTypes.array,
  ChatBoxFunc: PropTypes.func,
  boxStatus: PropTypes.string,
};

export default connect(mapStateToProps, { ChatBoxFunc })(UserDash);
