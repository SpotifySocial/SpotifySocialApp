module.exports = function(req,res,constants,request) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const stateSecret = req.cookies ? req.cookies[constants.stateCookie] : null;

  if (state === null || stateSecret !== process.env.AUTH_COOKIE_VAL) {
    res.redirect(401,constants.appRedirectDomain+constants.appErrorRedirectRoute);
    return;
  } else {
    res.clearCookie(constants.stateCookie);
    const authOptions = {
      url: constants.spotifyTokenUrl ,
      form: {
        code: code,
        redirect_uri: constants.backendRedirectDomain + constants.backendRedirectRoute,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
	  if(error || response.statusCode != 200){
	  	res.redirect(401,constants.appRedirectDomain+constants.appErrorRedirectRoute);
	  	return;
	  }
     
    	req.session.access_token = body.access_token;
    	req.session.refresh_token = body.refresh_token;
      req.session.expiry = new Date()/1000 + body.expires_in;
      res.redirect(200,constants.appRedirectDomain+constants.appOkRedirectRoute);
    });
  }
}