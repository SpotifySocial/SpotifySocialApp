const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv').config();
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request-promise'); 
const constants = require('./constants');
const helpers = require('./helpers/helpers.js');
const routes = require('./routes/routes.js');
const database = require('./database/database.js');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
var databaseClient = '';

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(cookieParser());

app.use(session({secret: process.env.SESSION_SECRET}));

app.use('/',function(req,res,next) {
	helpers.reset(req,res,next,constants,request);
});

app.get('/login', function(req, res) {
	routes.login(req,res,constants,querystring);
});

app.get(constants.backendRedirectRoute, function(req, res) {
	routes.redirect(req,res,constants,request);
});

app.get('/logout', function(req, res) {
	res.cookie(constants.loggedInCookieKey,false);
});

app.get('/profile', function(req, res) {
	routes.profile(req,res,constants,request,helpers,databaseClient);
});

app.get('/get/:what', function(req,res) {
	if(req.params.what == 'friends') {
		routes.fetchFriends(req,res,constants,request,helpers,databaseClient);
		return;
	}

	if(req.params.what == 'requests') {
		routes.fetchRequests(req,res,constants,request,helpers,databaseClient);
		return;
	}
	else {
		res.status(404).send('Invalid route');
		return;
	}
});

app.get('/new/:what', function(req,res) {
	if(req.params.what == 'friends') {
		routes.fetchFriends(req,res,constants,request,helpers,databaseClient);
		return;
	}

	if(req.params.what == 'requests') {
		routes.fetchRequests(req,res,constants,request,helpers,databaseClient);
		return;
	}
	else {
		res.status(404).send('Invalid route');
		return;
	}
});

const server = app.listen(process.env.PORT || 8080, () => { 
	if(!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
		server.close();
		return;
	}
	if(!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD || !process.env.MONGO_CONNECT_URI) {
		server.close();
		return;
	}

	const uri = process.env.MONGO_CONNECT_URI.replace('username',process.env.MONGO_USERNAME).replace('password',process.env.MONGO_PASSWORD);
	database.connect(MongoClient,uri,constants).then(client => {
		databaseClient = client;
		console.log(`Listening on port ${process.env.PORT || 8080}`);
		return;
	}, reject => {
		server.close();
		return;
	});
});