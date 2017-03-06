'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[ENV];
const app = express();
const WebSocketServer = require('ws').Server;
const webSocketServer = new WebSocketServer({ port: config.wsPort });

require('./services/websocket.service')(webSocketServer);

app.use(morgan('dev'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/', express.static(__dirname + config.static));
app.get('/api', function(req, res) {
  res.status(200).send('Hey!');
});

app.listen(config.port, function() {
  console.log('Magic is happening on port ', config.port);
});

