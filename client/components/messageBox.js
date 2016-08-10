import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import $ from 'jquery';
import MessageEntry from './messageEntry';
import io from 'socket.io-client';
import axios from 'axios';

class MessageBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
    };
  }

  componentWillMount() {
    // fetch previous messages for this specific event
    // const eventId = this.props.selectedEvent.eventId
    const eventId = 1;
    axios.get(`/api/message/${eventId}`).then((result) => {
      const messages = result.data;
      console.log(messages, 'MESSAGEEEES');
      this.setState({ messages: [...this.state.messages, ...messages] });
    });
  }

  componentDidMount() {
    // connect the io lib. to the root of our webserver;
    this.socket = io('/'); // that trigger the on connection event server side
    // set up a listenner for new messages that coming in
    this.socket.on('message', message => {
      this.setState({ messages: [...this.state.messages, message] });
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
    $('#chat_window_1').remove();
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
    console.log(this.state.message, 'inside forms');
    const content = this.state.message;
    // const userName = localStorage.getItem('userName')
    // const userId = localStorage.getItem('userId')
    // const eventId = this.props.selectedEvent.eventId
    const msg = {
      content,
      userName: 'Joe',
      createdAt: new Date(),
      userId: 1,
      eventId: 1,
    };

    // store the message in the database
    axios.post('/api/message/1', msg);

    // put the new message in the bottom of the list and add the old ones
    this.setState({ messages: [...this.state.messages, msg] }, () => { this.setState({ message: '' }); });
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
        <div className="row chat-window col-xs-5 col-md-3" id="chat_window_1" style={{ marginLeft: '10px' }}>

          <div className="col-xs-12 col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading top-bar">
                <div className="col-md-8 col-xs-8">
                  <h3 className="panel-title"><span
                    className="glyphicon glyphicon-comment"
                  ></span> Chat - EventName
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
  return {};
}

export default connect(mapStateToProps)(MessageBox);
