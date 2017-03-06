'use strict';

let activeUsers = [];
const types = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  ADD_NICKNAME: 'ADD_NICKNAME',
  UPDATE_ACTIVE_USERS: 'UPDATE_ACTIVE_USERS'
};


class UserStorage {
  constructor() {
    this._activeUsers = [];
  }

  addUser(user) {
    this._activeUsers.push(user);
  }

  removeUserBySocket(socket) {
    const index = this._activeUsers.findIndex((user)=> user.socket === socket);
    this._activeUsers.splice(index, 1);
  }

  broadcast(messageEvent) {
    this._activeUsers.forEach((user)=> {
      if (user.nickname !== messageEvent.message.author) {
        user.socket.send(JSON.stringify(messageEvent));
      }
    })
  }

  sendAllActiveUsers() {

  }

  getUserByNickname(nickname) {
    return this._activeUsers.find((user) => user.nickname === nickname);
  }

  getActiveUsersList() {
    return this._activeUsers.map((user)=> user.nickname);
  }
}

module.exports = function (webSocketServer) {
  const userStorage = new UserStorage();

  webSocketServer.broadcast = function (data) {
    for (let i in this.clients) {
      this.clients[i].send(data);
    }
  };

  webSocketServer.on('connection', function connection(socket) {
    socket.on('message', function(event) {
      console.log('received: %s', event);


      const messageEvent = JSON.parse(event);// !!!!

      switch (messageEvent.type) {
        case types.ADD_NICKNAME:
          userStorage.addUser({
            nickname: messageEvent.nickname,
            socket: socket
          });

          webSocketServer.broadcast(getActiveUserInfo());
          break;
        case types.NEW_MESSAGE:

          if (messageEvent.message.addressee) {
            const user = userStorage.getUserByNickname(messageEvent.message.addressee);
            if (user) {
              user.socket.send(JSON.stringify(messageEvent));
            }
          } else {
            userStorage.broadcast(JSON.stringify(messageEvent))
          }
      }
    });

    socket.on('close', function () {
      console.log('close connection', userStorage.getActiveUsersList())
      userStorage.removeUserBySocket(socket);
      webSocketServer.broadcast(getActiveUserInfo());
      console.log(userStorage.getActiveUsersList())
    });

    socket.send(JSON.stringify({message: 'you are connected'}));
    socket.send(getActiveUserInfo());
  });

  function getActiveUserInfo() {
    return JSON.stringify({
      type: types.UPDATE_ACTIVE_USERS,
      activeUsers: userStorage.getActiveUsersList()
    });
  }
};
