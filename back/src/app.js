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

app.use('/', function(req,res,next) {
  res.header('Access-Control-Allow-Origin', constants.appRedirectDomain);
  res.header('Access-Control-Allow-Credentials','true');
  next();
});

app.use(cookieParser());

app.use(session({secret: process.env.SESSION_SECRET}));

app.use('/',function(req,res,next) {
	helpers.reset(req,res,next,constants,request);
});

app.use('/', function(req,res,next) {
	helpers.currId(req,res,next,constants,request);
});

app.get('/login', function(req, res) {
	routes.login(req,res,constants,querystring);
});

app.get(constants.backendRedirectRoute, function(req, res) {
	routes.redirect(req,res,constants,request);
});

app.get('/logout', function(req, res) {
	res.clearCookie(constants.tokenCookieKey);
	res.cookie(constants.loggedInCookieKey,false);
  req.session.destroy();
	res.status(200).send('Successfully logged out');
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

	if(req.params.what == 'users') {
		routes.fetchUsers(req,res,constants,request,helpers,databaseClient);
		return;
	}

	else {
		res.status(404).send('Invalid route');
		return;
	}
});

app.get('/new/:what', function(req,res) {
	//const user_id = req.body.user_id;
	const user_id = '22e6n5fmjsvscvp8dzkg33n10';
	if(!user_id) {
		res.status(400).send('Provide a user id in query body');
	}

	helpers.users(databaseClient,constants).then(users => {
		var found = false;
		for(var id of users.id) {
			if(id == user_id){
				found = true;
				break;
			}
		}

		if(!found) {
			res.status(400).send('Provide a user id that exists');
			return;
		}

		if(req.params.what == 'friend') {
			routes.newFriends(req,res,constants,request,helpers,databaseClient,user_id);
			return;
		}

		if(req.params.what == 'request') {
			routes.newRequests(req,res,constants,request,helpers,databaseClient,user_id);
			return;
		}
		else {
			res.status(404).send('Invalid route');
			return;
		}
	}, reject => {
		res.status(500).send("Database Error: Failed to fetch users");
		return;
	});
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
