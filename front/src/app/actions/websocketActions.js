'use strict';

import websocketService from '../services/websocket.service';
import * as actionTypes from '../constants/ActionTypes';

export function connectWithRedux(dispatch) {
  websocketService.onMessage((event)=> {
    let message = parseData(event.data);

    if (actionTypes[message.type]) {
      dispatch(message);
    } else {
      console.info('MESSAGE: ', message);
    }
  });
}

function parseData(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('ERROR:', e);
  }
}
