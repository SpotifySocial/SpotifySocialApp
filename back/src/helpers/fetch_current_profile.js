module.exports = function(req,res,next,constants,request) {
  if(req.originalUrl != '/profile' && !req.originalUrl.includes('/get') && !req.originalUrl.includes('/new')) {
    next();
    return;
  }

  if(req.session.user_id) {
    next();
    return;
  }

  const access_token = req.session.access_token;
  const options = {
      url: constants.spotifyProfileUrl,
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      if(error) {
        res.status(400).send('Bad Request, Failed to get Profile');
        return;
      }
      req.session.user_id = body['id'];
      req.session['display_name'] = body['display_name'];
      req.session['spotify'] = body['external_urls']['spotify'];
      req.session['images']  = body['images'];
      next();
    });
}
