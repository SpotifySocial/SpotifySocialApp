module.exports = function(req,res,constants,request) {
  if(!req || !req.session || !req.session.refresh_token) {
  	return Promise.reject({http_code:400, error_message: 'Refresh Token not set. Login First!' });
  }

  const refresh_token = req.session.refresh_token;
  var authOptions = {
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

  return new Promise(function(resolve,reject) {
  	request.post(authOptions, function(error, response, body) {
  		if (error || response.statusCode != 200) {
  			reject({http_code:401, error_message: 'Refresh Token expired and not successfully reset' });
  			return;
  		}
  		req.session.access_token = body.access_token;
      	req.session.expiry = new Date()/1000 + body.expires_in;
  		resolve(req.session.access_token);
  		return;
  	});
  });
}