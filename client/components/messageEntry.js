import React from 'react';
import moment from 'moment';

const MessageEntry = ({ body }) => {
  if (localStorage.getItem('userId') === body.userId) {
    return (
      <div className="row msg_container base_sent">
        <div className="col-md-10 col-xs-10">
          <div className="messages msg_sent">
            <p>{body.content}</p>
            <time dateTime="2016-08-10T13:00"> {body.userName} - {moment(body.createdAt).fromNow()} </time>
          </div>
        </div>
        <div className="col-md-2 col-xs-2 avatar">
          <img
            alt=""
            src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"
            className="img-responsive"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="row msg_container base_receive">
      <div className="col-md-2 col-xs-2 avatar">
        <img
          alt=""
          src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg"
          className="img-responsive"
        />
      </div>
      <div className="col-md-10 col-xs-10">
        <div className="messages msg_sent">
          <p>{body.content}</p>
          <time dateTime="2016-08-10T13:00"> {body.userName} - {moment(body.createdAt).fromNow()} </time>
        </div>
      </div>
    </div>
  );
};

export default MessageEntry;
