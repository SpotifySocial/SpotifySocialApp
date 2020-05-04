module.exports = function(req,res,constants,request,helpers) {
	const access_token = req.session.access_token;
	const options = {
      url: constants.spotifyProfileUrl,
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      if(error) {
      	res.status(400).send('Bad Request, Failed to get Profile');
      }
      // fetch all users
      // check if user is in there
      // add a user 
      res.status(200).send(body);
    });
}