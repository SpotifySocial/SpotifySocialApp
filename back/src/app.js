const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv').config();
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
var request = require('request'); 
const constants = require('./constants');
const routes = require('./routes/routes.js');
const cors = require('cors');


app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(cookieParser());

app.use(session({secret: process.env.SESSION_SECRET}));

app.get('/login', function(req, res) {
	routes.login(req,res,constants,querystring);
});

app.get(constants.backendRedirectRoute, function(req, res) {
	routes.redirect(req,res,constants,request);
});

app.get('/logout', function(req, res) {
	res.clearCookie(constants.loggedInCookieKey,false);
});

const server = app.listen(process.env.PORT || 8080, () => { 
	if(!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
		server.close();
		return;
	}
	console.log(`Listening on port ${process.env.PORT || 8080}`);
});