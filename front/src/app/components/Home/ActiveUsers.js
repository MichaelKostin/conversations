'use strict';

import React from 'react';

const ActiveUsers = ({users})=> (
    <div className="active-users">
        <h3>Active Users</h3>
        <ul>
            { users.map( user=> (<li key={user}>{user}</li>)) }
        </ul>
    </div>
);

export default ActiveUsers;
