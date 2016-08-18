import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import MessageEntry from './messageEntry';
import io from 'socket.io-client';
import axios from 'axios';
import { ChatBoxFunc } from '../actions/index';

class MessageBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
    };
  }

  componentDidMount() {
    const eventId = this.props.eventId.eventId;
    axios.get(`/api/message/${eventId}`).then((result) => {
      const messages = result.data;
      this.setState({ messages: [...this.state.messages, ...messages] }, () => {
      // Keep scrollBAr down
        const msgbox = document.getElementsByClassName('panel-body msg_container_base');
        msgbox[0].scrollTop = msgbox[0].scrollHeight;
      });
    });

    // connect the io lib. to the root of our webserver;
    this.socket = io('/'); // that trigger the on connection event server side
    // set up a listenner for new messages that coming in
    this.socket.on('message', (message) => {
      this.setState({ messages: [...this.state.messages, message] }, () => {
        // Keep scrollBAr down
        const msgbox = document.getElementsByClassName('panel-body msg_container_base');
        msgbox[0].scrollTop = msgbox[0].scrollHeight;
      });
    });
  }

  onMinim(e) {
    if (!$(e.target).hasClass('panel-collapsed')) {
      $(e.target).parents('.panel').find('.panel-body')
        .slideUp();
      $(e.target).addClass('panel-collapsed');
      $(e.target).removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
      $(e.target).parents('.panel').find('.panel-body')
        .slideDown();
      $(e.target).removeClass('panel-collapsed');
      $(e.target).removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
  }

  onClose(e) {
    this.props.ChatBoxFunc('false');
    // $('#chat_window_1').remove();
  }

  onFooter(e) {
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
      $(e.target).parents('.panel').find('.panel-body')
        .slideDown();
      $('#minim_chat_window').removeClass('panel-collapsed');
      $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const eventId = this.props.eventId.eventId;
    const content = this.state.message;
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    // const eventId = this.props.selectedEvent.eventId
    const msg = {
      content,
      userName,
      createdAt: new Date(),
      userId,
      eventId,
    };

    // store the message in the database
    axios.post('/api/message/1', msg);

    // put the new message in the bottom of the list and add the old ones
    this.setState({ messages: [...this.state.messages, msg] }, () => {
      // delete input
      this.setState({ message: '' });
      // Keep scrollBAr down
      const msgbox = document.getElementsByClassName('panel-body msg_container_base');
      console.log(msgbox, 'SCROLLL DOWN');
      msgbox[0].scrollTop = msgbox[0].scrollHeight;
    });
    this.socket.emit('message', msg); // trigger on message event server side
  }

  renderMsg() {
    const msges = this.state.messages.map((message, index) => {
      return (<MessageEntry
        key={index}
        body={message}
      />);
    });
    return msges;
  }

  render() {
    return (
      <div className="container">
        <div
          className="row chat-window col-xs-5 col-md-3"
          id="chat_window_1"
          style={{ marginLeft: '10px', zIndex: 4 }}
        >

          <div className="col-xs-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading top-bar">
                <div className="col-md-8 col-xs-8">
                  <h3 className="panel-title"><span
                    className="glyphicon glyphicon-comment"
                  ></span> Chat - {this.props.eventId.evName}
                  </h3>
                </div>
                <div className="col-md-4 col-xs-4" style={{ textAlign: 'right' }}>
                  <a href="#">
                    <span
                      id="minim_chat_window"
                      className="glyphicon glyphicon-minus icon_min"
                      onClick={(e) => this.onMinim(e)}
                    >
                    </span>
                  </a>
                  <a href="#">
                    <span
                      className="glyphicon glyphicon-remove icon_close"
                      data-id="chat_window_1"
                      onClick={(e) => this.onClose(e)}
                    >
                    </span>
                  </a>
                </div>
              </div>

              <div className="panel-body msg_container_base">
                {this.renderMsg()}
              </div>

              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="panel-footer">
                  <div className="input-group">
                    <input
                      id="btn-input"
                      type="text"
                      className="form-control input-sm chat_input"
                      placeholder="Write a message here..."
                      onClick={(e) => this.onFooter(e)}
                      onChange={(e) => this.setState({ message: e.target.value })}
                      value={this.state.message}
                    />
                    <span className="input-group-btn">
                      <button className="btn btn-primary btn-sm" id="btn-chat"> Send </button>
                    </span>
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    eventId: state.eventId.id,
  };
}

MessageBox.PropTypes = {
  EventId: PropTypes.object,
  ChatBoxFunc: PropTypes.func,

};

export default connect(mapStateToProps, { ChatBoxFunc })(MessageBox);

