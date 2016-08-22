import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import ChefPast from '../containers/chefPast';
import ChefUpcoming from '../containers/chefUpcoming';
import ChefInfo from '../containers/chefInfo';
import { ChefEventsFunc, ChatBoxFunc } from '../actions/index';
import MessageBox from './messageBox';


class ChefDash extends Component {

  componentDidMount() {
    this.props.ChefEventsFunc();
  }

  componentWillUnmount() {
    this.props.ChatBoxFunc('false');
  }

  render() {
    return (
      <div>
        <div>
          {this.props.boxStatus === 'true' ? <MessageBox /> : null}
        </div>
        <Tabs
          defaultActiveKey={1}
          animation={false} id="noanim-tab-example"
        >

          <Tab eventKey={1} title="Chef Info">
            <div className="user-feed">
              <ChefInfo />
            </div>
          </Tab>

          <Tab eventKey={2} title="Past Events">
            <div className="user-feed">
              <ChefPast />
            </div>
          </Tab>

          <Tab eventKey={3} title="Upcoming Events">
            <div>
              <ChefUpcoming />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boxStatus: state.boxStatus.status,
  };
}

ChefDash.propTypes = {
  ChefEventsFunc: PropTypes.func,
  ChatBoxFunc: PropTypes.func,
  boxStatus: PropTypes.string,
};

export default connect(mapStateToProps, { ChefEventsFunc, ChatBoxFunc })(ChefDash);
