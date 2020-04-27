const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv').config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(session({secret: 'secret'}));

const server = app.listen(process.env.PORT || 8080, () => { 
	if(!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
		server.close();
		return;
	}
	console.log(`Listening on port ${process.env.PORT || 8080}`);
});