'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { sendMessage, startChat } from '../actions';
import Chat from '../components/Home/Chat';
import ActiveUsers from '../components/Home/ActiveUsers';

const mapStateToProps = (state) => ({
  nickname: state.app.nickname,
  messages: state.app.messages,
  addressee: state.app.chatWith,
  activeUsers: state.app.activeUsers
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message) => dispatch(sendMessage(message)),
  startChat: (username) => dispatch(startChat(username))
});

function getMessagesFromUser(messages, user) {
  return messages.filter((message)=>  message.author === user).length;
}

const ChatPage = ({nickname, messages, addressee, activeUsers, sendMessage, startChat})=> {
  let users = activeUsers.filter(user=> user !== nickname);
  users = users.map((username)=> {
    return {
      name: username,
      messagesFromUser: getMessagesFromUser(messages, username)
    };
  });
  console.log('addressee:', addressee)

  return (
    <div className="window chat-window">
      <Chat
        messages={messages}
        nickname={nickname}
        addressee={addressee}
        sendMessage={sendMessage}
      />
      <ActiveUsers users={users} startChat={startChat}/>
    </div>
  )
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
