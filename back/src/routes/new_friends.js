module.exports = function(req,res,constants,request,helpers,client,user_id) {
	helpers.friends_data(req,res,constants,request,client).then(friend_data => {
		var requests = []
		for (var data of friend_data.requests) {
			requests.push(data.id);
		}
		var found = false;
		var found_id;
		for( var id of requests) {
			if(id == user_id) {
				found = true;
				found_id = id;
				break;
			}
		}

		requests = requests.filter(id => id != found_id);

		if(!found) {
			res.status(400).send('Bad Request: No friend request found with such user_id');
			return;
		}

		var friends = []
		for (var data of friend_data.friends) {
			friends.push(data.id);
		}
		friends.push(user_id);
		const query = { _id: req.session.user_id };
		const updateFriend = {  $set: { friends: friends } };
		const updateRequest = { $set: { requests: requests}};
		client.collection(constants.database.friends_collection).updateOne(query,updateFriend,function(err, response) {
			if(err) {
				res.status(500).send('Database Error: Could not add friend');
				return;
			}

			client.collection(constants.database.friends_collection).updateOne(query,updateRequest,function(err, response) {
				if(err) {
					res.status(500).send('Database Error: Could delete friend request');
					return;
				}
				res.status(200).send('Successfully Added friend');
				return;
			});
		});
	}, error => {
		res.status(error.http_code).send(error.error_message);
		return;
	});
}