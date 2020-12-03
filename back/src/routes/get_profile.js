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

      helpers.users(client,constants,helpers,request,req.session.access_token).then(users => {
            const ids = [];
            for (const user of users)
                  ids.push(user.id);

		  let found = false;
		  for (const id of ids) {
      		if(id === curr_id) {
      			found = true;
      			break;
      		}
      	}
      	if(found) {
      		res.status(200).send(returnVal);
      		return;
      	}

      	ids.push(curr_id);
      	helpers.add_users(client,constants,ids,curr_id).then(val => {
                  req.token = true;
      		res.status(200).send(returnVal);
      	}, reason => {
      		res.status(500).send('Database Update error');
      	});

      }, reason => {
      		res.status(500).send('Database Update error');
      });
}
