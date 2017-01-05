'use strict';

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../constants/ActionTypes';

const initialState = {
  nickname: null,
  activeUsers: ['foo', 'bar'],
  errors: []
};

function app(state = initialState, action) {
  switch (action.type) {
    case types.ADD_NICKNAME:
      return Object.assign({}, state, { nickname: action.nickname });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  routing
});

export default rootReducer;
