

module.exports = function(req,res,constants,request,helpers,client,user_id,flag) {
	const friend_id = user_id;
    user_id = req.session.user_id;
	helpers.friends_data(req,res,constants,request,client,helpers).then(friend_data => {
		var requests = []
		for (var data of friend_data.requests) {
			requests.push(data.id);
		}
		var found = false;
		var found_id;
		for( var id of requests) {
			if(id == friend_id) {
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
		friends.push(friend_id);
		const query = { _id: user_id };
		const updateFriend = {  $set: { friends: friends } };
		const updateRequest = { $set: { requests: requests}};

		var promise;
		if(flag)
			promise = accepted(client,constants,query,updateRequest,updateFriend);
		else
			promise = rejected(client,constants,query,updateRequest);

		promise.then(success => {
			res.status(success.http_code).send(success.message);
			return;
		}, err => {
			res.status(err.http_code).send(err.error_message);
			return;
		});
	}, error => {
		res.status(error.http_code).send(error.error_message);
		return;
	});
}


function accepted(client,constants,query,updateRequest,updateFriend) {
	return new Promise(function(resolve,reject) {
			client.collection(constants.database.friends_collection).updateOne(query,updateFriend,function(err, response) {
			if(err) {
				reject({http_code:500, error_message: 'Database Error: Could not add friend' });
				return;
			}

			client.collection(constants.database.friends_collection).updateOne(query,updateRequest,function(err, response) {
				if(err) {
					reject({http_code:500, error_message: 'Database Error: Could delete friend request'} );
					return;
				}

				resolve({http_code: 200, message: 'Successfully Added friend'});
				return;
			});
		});
	});
}

function rejected(client,constants,query,updateRequest) {
	return new Promise(function(resolve,reject) {
		client.collection(constants.database.friends_collection).updateOne(query,updateRequest,function(err, response) {
			if(err) {
				reject({http_code:500, error_message: 'Database Error: Could delete friend request'});
				return;
			}

			resolve({http_code: 200, message: 'Successfully Deleted Friend Request'});
			return;
		});
	});
}