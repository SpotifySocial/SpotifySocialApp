const helpers = require('./helpers/helpers.js');
const routes = require('./routes/routes.js');

function get(req,res,constants,request,client) {
	if(req.params.type === 'songs') {
		if(req.params.what === 'saved')
			routes.savedSongs(req,res,constants,request,helpers);
		else if(req.params.what === 'top')
			routes.topSongs(req,res,constants,request,helpers);
		else {
			res.status(400).send('Bad Request! Invalid Route');
			return;
		}
	}

	else if(req.params.type === 'artists') {
		if(req.params.what === 'top')
			routes.topArtists(req,res,constants,request,helpers);
		else {
			res.status(400).send('Bad Request! Invalid Route');
			return;
		}
	}

	else{
		res.status(400).send('Bad Request! Invalid Route');
		return;
	}

}

function post(req,res,constants,request,client) {
	if(req.params.type === 'similarity') {
		if(req.params.what === 'update') {
			if(!req.body.data && req.body.data.length === 0) {
				res.send(400).send('Bad Request! Missing or empty data input');
				return;
			}
			
			routes.updateSimilarity(req,res,constants,client,helpers);
		}
		else {
			res.status(400).send('Bad Request! Invalid Route');
			return;
		}		
	}

	else if(req.params.type === 'songs') {
		if(req.params.what === 'similar') {
			if(!req.body && !req.body.user_id) {
				res.send(400).send('Bad Request! Missing or empty data input');
				return;
			}
			
			routes.songsSimilarity(req,res,constants,client,helpers,request);
		}

		else {
			res.status(400).send('Bad Request! Invalid Route');
			return;
		}		
	}

	else if(req.params.type === 'surprise') {
		if(req.params.what === 'update') {
			if(!req && !req.body && !req.body.data) {
				res.send(400).send('Bad Request! Missing or empty data input');
				return;
			}
			
			routes.updateSurprise(req,res,constants,client,helpers);
		}
		else {
			res.status(400).send('Bad Request! Invalid Route');
			return;
		}		
	}

	else {
		res.status(400).send('Bad Request! Invalid Route');
		return;
	}
}


function middleware(req,res,next,constants,request,client) {
	if(req.method === 'GET') {
		helpers.fetchIdTokens(req,res,next,constants,request,client).then(data => {
			req.session.ids = data.ids;
			req.session.tokens = data.tokens;
			helpers.fetchAccess(req,res,next,constants,request,req.session.tokens,helpers,client).then(done => {
				next();
				return;
			}, err => {
				res.status(err.http_code).send(err.error_message);
				return;
			});
		}, error => {
			res.status(error.http_code).send(error.error_message);
			return;
		});
	}

	if(req.method === 'POST') {
		helpers.fetchIdTokens(req,res,next,constants,request,client).then(data => {
			req.session.ids = data.ids;
			req.session.tokens = data.tokens;
			helpers.fetchAccess(req,res,next,constants,request,req.session.tokens,helpers,client).then(done => {
				next();
				return;
			}, err2 => {
				res.status(err2.http_code).send(err2.error_message);
				return;
			});
		}, error => {
			res.status(error.http_code).send(error.error_message);
			return;
		});
	}
}

module.exports = {
	get: get,
	post: post,
	middleware:middleware
}