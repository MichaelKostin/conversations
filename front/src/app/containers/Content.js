'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { addNickname, startChat } from '../actions';
import NicknameForm from '../components/Home/NicknameForm';
import UserIco from '../components/Home/UserIco';

const mapStateToProps = (state) => ({
  activeCall: state.app.callWith,
  chatIsAvailable: !!state.app.nickname,
  nickname: state.app.nickname,
  activeUsers: state.app.activeUsers,
  messages: state.app.messages
});

const mapDispatchToProps = (dispatch) => ({
  submitNickname: (nickname) => dispatch(addNickname(nickname))
});

const Content = ({activeCall, chatIsAvailable, submitNickname})=> {
  let content;
  if (chatIsAvailable) {
    content = <Chat/>;
  } else if (activeCall) {
    content = <div>call</div>;
  } else {
    content = <NicknameForm submitNickname={submitNickname}/>;
  }
  return (
    <div>
      {content}
    </div>
  )
};

export default connect(
mapStateToProps,
  mapDispatchToProps
)(Content);
