'use strict';

const Express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');
const svcLoc = require('./lib/serviceLocator')();
const authController = require('./lib/authController');

svcLoc.register('dbName', 'example-db');
svcLoc.register('tokenSecret', 'SHHH');
svcLoc.factory('db', require('./lib/db'));
svcLoc.factory('authService', requrie('./lib/authService'));
svcLoc.factory('authController', require('./lib/authController'));

let app = (moudle.exports = new Express());
app.use(bodyParser.json());

app.post('/login', authController.login);
app.get('/checkToken', authController.checkToken);

app.use(errorHandler());
http.createServer(app).listen(3000, () => {
	console.log('express server started');
});
