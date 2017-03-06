'use strict';

import React from 'react';

const MessageNotification = ({message, openChat})=> {
  let text = message.text.length < 100 ? message.text : message.text.slice(100) + '...';
  return (
    <div className="message-notification" onClick={()=> {openChat(message.author)}}>
      <h4>New Message</h4>
      <p><strong>{message.author}</strong>: {text}</p>
    </div>
  )
};

export default MessageNotification;
