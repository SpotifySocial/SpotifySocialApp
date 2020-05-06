const helpers = require('./helpers/helpers.js');
const routes = require('./routes/routes.js');

function get(req,res,constants,request,client) {
	if(req.params.what == 'songs') {
		routes.songs(req,res,constants,request,helpers);
	}
}

function post(req,res,constants,request,client) {

}


function middleware(req,res,next,constants,request,client) {
	if(req.method == 'GET') {
		helpers.fetchIdTokens(req,res,next,constants,request,client).then(data => {
			req.session.ids = data.ids;
			req.session.tokens = data.tokens;
			helpers.fetchAccess(req,res,next,constants,request,req.session.refresh_token,helpers,client).then(done => {
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
}

module.exports = {
	get: get,
	post: post,
	middleware:middleware
}