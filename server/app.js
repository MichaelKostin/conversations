'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[ENV];
const app = express();
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

app.use(morgan('dev'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + config.static));
app.get('/api', function(req, res) {
  res.status(200).send('Hello World!');
});

app.listen(config.port, function() {
  console.log('Magic is happening on port 3000!');
});

