module.exports = function(req,res,constants,request,helpers,client) {
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
      const curr_id = body['id'];
      const curr_name = body['display_name'];
      const spotifyUrl = body['external_urls']['spotify'];
      const images = body['images'];
      const returnVal = {
      	'id': curr_id,
      	'display_name': curr_name,
      	'spotifyUrl' : spotifyUrl,
      	'images': images
      };
      
      helpers.users(client,constants).then(users => {
      	var found = false;
      	for ( var id of users.id) {
      		if(id == curr_id) {
      			found = true;
      			break;
      		}
      	}
      	if(found) {
      		res.status(200).send(returnVal);
      		return;
      	}
      	users.id.push(curr_id);
      	users.display_name.push(curr_name);
      	helpers.add_users(client,constants,users.id,users.display_name).then(val => {
      		res.status(200).send(returnVal);
      	}, reason => res.status(500).send('Database Update error'))

      }, reason => res.status(500).send('Database fetch error'));
    });
}