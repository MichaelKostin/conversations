'use strict';

import React from 'react';

const UserIco = ({nickname})=> (
    <div className="user-ico">
        <span className="nickname">nickname</span>
        <span>{nickname}</span>
    </div>
);

export default UserIco;
