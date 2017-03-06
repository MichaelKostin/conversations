'use strict';

import React from 'react';

const Chat = ({messages, nickname, addressee, sendMessage}) => {
  let input;
  const submit = (e) => {
    e.preventDefault();
    var text = input.value;
    if (text.trim()) {
      sendMessage({
        author: nickname,
        addressee: addressee || null,
        text
      });
      input.value = '';
    }
  };

  const detectEnter = (e)=> {
    if (e.keyCode === 13 && !e.ctrlKey) {
      submit(e);
    }
  };

  let availableMessages = [];
  if (addressee) {
    availableMessages = messages.filter((message)=> {
      return message.addressee === nickname && message.author === addressee ||
          message.addressee === addressee && message.author === nickname;
    })
  } else {
    availableMessages = messages.filter((message)=> !message.addressee);
  }

  return (
    <div className="chat">
      <h3>Chat</h3>
      <div className="members">
        <p>{nickname}</p>
        <p>{addressee || (<strong>All</strong>)}</p>
      </div>
      <div className="messages">
        {
          messages.map((message, index)=> (
            <p key={index} className={'left-align'}><span>{message.author}</span>{message.text}</p>
          ))
        }
      </div>
      <form onSubmit={submit} onKeyDown={detectEnter}>
        <textarea
          ref={(ref)=> input = ref }
          autoFocus="autofocus"
          placeholder="Type your text here..."
        />
        <button>Send</button>
      </form>
    </div>
  )
};

export default Chat;
