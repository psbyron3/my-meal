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
const routesDish = require('./routes/routesDish.js');
const routesAuth = require('./routes/routesAuth.js');
const routesReview = require('./routes/routesReview.js');
const routesSearch = require('./routes/routesSearch.js');
const routesTag = require('./routes/routesTag.js');

const multiparty = require('connect-multiparty');
const multipartyMiddleware = multiparty();

app.use(multipartyMiddleware);
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./client'));


// Routing
app.use('/api/user', routesUser);
app.use('/api/auth', routesAuth);
app.use('/api/event', routesEvent);
app.use('api/dish', routesDish);
app.use('/api/review', routesReview);
app.use('/api/search', routesSearch);
app.use('/api/tag', routesTag);


app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), () => {
  console.log(moment().format('h:mm:ss a'), ': Express Server listening on port', app.get('port'));
});
