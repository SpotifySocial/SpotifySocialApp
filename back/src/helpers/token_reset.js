module.exports = function(req,res,next,constants,request) {
  if(req.originalUrl != '/profile' && !req.originalUrl.includes('/get') && !req.originalUrl.includes('/new') && !req.originalUrl.includes('/update')) {
    next();
    return;
  }

  const refresh_token = req.session.refresh_token || req.cookies[constants.tokenCookieKey];

  if(!refresh_token) {
    res.status(401).send("Unauthorized! Could not find refresh token");
    return;
  }
  if(req.session.refresh_token &&  req.session.expiry && req.session.access_token && (new Date()/1000 -  req.session.expiry) > 100 ) {
    next();
    return;
  }
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

  const resetPromise =  new Promise(function(resolve,reject) {
  	request.post(authOptions, function(error, response, body) {
  		if (error || response.statusCode != 200) {
  			reject({http_code:401, error_message: 'Refresh Token not successfully reset' });
  			return;
  		}
  		req.session.access_token = body.access_token;
      req.session.expiry = new Date()/1000 + body.expires_in;
      req.session.refresh_token = body.refresh_token || refresh_token;
      res.cookie(constants.tokenCookieKey,req.session.refresh_token);
      if(body.refresh_token !=  refresh_token)
        req.token = true;
  		resolve(req.session.access_token);
  		return;
  	});
  });

  resetPromise.then(reason => next() ,reject => { 
    res.status(400).send(reject.error_message);
    return;
  });
}