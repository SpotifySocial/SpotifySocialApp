module.exports = function(req,res,constants,querystring) {
	res.cookie(constants.stateCookie, process.env.AUTH_COOKIE_VAL);
  	res.redirect(constants.spotifyAuthUrl +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: constants.authScope,
      redirect_uri: constants.backendRedirectDomain + constants.backendRedirectRoute,
      state:  process.env.AUTH_COOKIE_VAL,
      show_dialog: true
    }));
}