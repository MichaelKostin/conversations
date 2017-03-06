'use strict';

import * as types from '../constants/ActionTypes';
import webSocketService from '../services/websocket.service';

export function addNickname(nickname) {
  const actionObject = {
    type: types.ADD_NICKNAME,
    nickname
  };

  return (dispatch, getState)=> {
    const activeUsers = getState().app.activeUsers;
    if (activeUsers.indexOf(nickname) > -1) {
      return dispatch({
        type: types.ERROR,
        message: 'User with nickname "' + nickname + '" already exists'
      });
    }

      webSocketService.sendActionToServer(actionObject);
      dispatch(actionObject);
  }
}

export function removeError(message) {
  return {
    type: types.REMOVE_ERROR,
    message
  }
}

export function sendMessage(message) {
  var messageAction = {
    type: types.NEW_MESSAGE,
    message
  };

  return (dispatch) => {
    try {
      webSocketService.sendActionToServer(messageAction);
      dispatch(messageAction);
    } catch (e) {
      dispatch({
        type: types.ERROR,
        message: e
      });
    }
  }
}

export function startChat(name) {
  return {
    type: types.START_CHAT,
    name
  }
}

export function closeChat() {
  return {
    type: types.CLOSE_CHAT
  }
}


