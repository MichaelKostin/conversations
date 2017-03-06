'use strict';

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../constants/ActionTypes';

const initialState = {
  nickname: null,
  activeUsers: [],
  chatWith: null,
  callWith: null,
  messages: [],
  privateMessages: [],
  errors: []
};

function app(state = initialState, action) {
  switch (action.type) {
    case types.ADD_NICKNAME:
      return Object.assign({}, state, { nickname: action.nickname });
    case types.ERROR:
      return Object.assign({}, state, { errors: [...state.errors, action.message] });
    case types.REMOVE_ERROR:
      return Object.assign({}, state, { errors: state.errors.filter(mess => mess !== action.message)});
    case types.UPDATE_ACTIVE_USERS:
      return Object.assign({}, state, { activeUsers: [...action.activeUsers] });
    case types.START_CHAT:
      return Object.assign({}, state, { chatWith: action.name });
    case types.CLOSE_CHAT:
      return Object.assign({}, state, { chatWith: null });
    case types.NEW_MESSAGE:
      return Object.assign({}, state, { messages: [...state.messages, action.message] });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  routing
});

export default rootReducer;
