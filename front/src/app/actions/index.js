'use strict';

import * as types from '../constants/ActionTypes'

export function addNickname(nickname) {
    console.log('add', nickname);
    return {
        type: types.ADD_NICKNAME,
        nickname
    };
}

