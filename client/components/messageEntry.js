import React, { PropTypes } from 'react';
import moment from 'moment';

const MessageEntry = ({ body }) => {
  if (Number(localStorage.getItem('userId')) === body.userId) {
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
            src={localStorage.getItem('userPic')}
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
          src={body.user.userPic}
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

MessageEntry.propTypes = {
  body: PropTypes.object,
};

export default MessageEntry;
