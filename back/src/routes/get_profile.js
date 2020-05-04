module.exports = function(req,res,constants,request,helpers,client) {  
      const curr_id = req.session.user_id;
      const curr_name = req.session['display_name'];
      const spotifyUrl = req.session['spotify'];
      const images = req.session['images'];
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
      	}, reason => {
      		res.status(500).send('Database Update error');
      		return;
      	});

      }, reason => {
      		res.status(500).send('Database Update error');
      		return;
      });
}