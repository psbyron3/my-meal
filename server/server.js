const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const socketIo = require('socket.io');

const dotenv = require('dotenv').config({ path: '../.env' });

const db = require('./db/db.js');


const app = express(); // create an instatiation of express for the routing
const server = http.createServer(app);// create a http sever itself and handle our app for socket io
const io = socketIo(server);// create a new instance of socket.io and handle our webserver that we create

const routesUser = require('./routes/routesUser.js');
const routesEvent = require('./routes/routesEvent.js');
const routesAuth = require('./routes/routesAuth.js');
const routesReview = require('./routes/routesReview.js');
const routesSearch = require('./routes/routesSearch.js');
const routesTag = require('./routes/routesTag.js');
const routesMessage = require('./routes/routesMessage.js');


const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

app.use(multipartyMiddleware);
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('../client'));


// Routing
app.use('/api/user', routesUser);
app.use('/api/auth', routesAuth);
app.use('/api/event', routesEvent);
app.use('/api/review', routesReview);
app.use('/api/tag', routesTag);
app.use('/api/search', routesSearch);
app.use('/api/message', routesMessage);


app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.set('port', process.env.PORT || 8000);


server.listen(app.get('port'), () => {
  console.log(moment().format('h:mm:ss a'), ': Express Server listening on port', app.get('port'));
});

// socket
const connections = [];
io.on('connection', (socket) => {
  // when a client send a message event
  socket.on('message', (body) => {
    // console.log('BOOODY', body);
    // emit this message to all other client that are listenning (if I want to exclude myself use broadcast)
    socket.broadcast.emit('message', body);
  });
});
