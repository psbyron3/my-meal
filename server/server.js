const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const morgan = require('morgan');
const path = require('path');

const dotenv = require('dotenv').config();

const db = require('./db/db.js');


const routesUser = require('./routes/routesUser.js');
const routesEvent = require('./routes/routesEvent.js');

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name');
  next();
});

// Routing
// app.use('/api/user', routesUser);
// app.use('/api/event', routesEvent);


app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client', 'index.html'));
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log(moment().format('h:mm:ss a') + ': Express Server listening on port', app.get('port'));
});
