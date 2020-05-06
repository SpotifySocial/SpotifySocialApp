module.exports = function(req,res,next,constants,request,refresh_tokens,helpers,client) {
	return new Promise(function(resolve,reject) {
		if(typeof refresh_tokens == 'string') {
			refresh_tokens = [refresh_tokens];
		}
		const options = [];

		for(var refresh_token of refresh_tokens) {
			var option = {
			    url: constants.spotifyTokenUrl ,
			    headers: {
			        'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
			      },
			    form: {
			      grant_type: 'refresh_token',
			      refresh_token: refresh_token
			    },
			    json: true
			  };
			 options.push(option);
		}

		const promises = options.map(option => request.post(option));
		Promise.all(promises).then(body => {
			const access_tokens = [];
			for(var i in body) {
				access_tokens.push(body[i].access_token);
				if(body[i].refresh_token && body[i].refresh_token != refresh_tokens[i]) {
					req.session.tokens[i] = body[i].refresh_token;
					//helpers.editToken(req.session.ids[i],body[i].access_token,client,constants,res);
				}
			}
			req.session.access_tokens = access_tokens;
			resolve('ok');
			return;
			}, reason => {
				reject({http_code: 400, error_message: 'Could not fetch access_token'});
			});
		});
	}	