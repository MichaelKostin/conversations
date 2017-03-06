'use strict';

import React from 'react';

const ActiveUsers = ({users, startChat})=> {
  return(
    <div className="active-users">
      <h4>Online</h4>
      <ul>
        { users.map( user=> (
          <li key={user.name} >
              <div>{user.name}
                {
                  user.messagesFromUser ? (
                    <span>({user.messagesFromUser})</span>
                  ) : ''
                }
              </div>
              <div className="buttons">
                  <button onClick={()=> {startChat(user.name)}} className="mail-ico">&#9993;</button>
                  <button className="call-ico">&#9742;</button>
              </div>
          </li>
        )) }
      </ul>
  </div>
)};

export default ActiveUsers;
