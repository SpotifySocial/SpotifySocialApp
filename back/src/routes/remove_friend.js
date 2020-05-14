module.exports = function(req,res,constants,request,helpers,client,user_id) {
	const curr_user_id = req.session.user_id;
	const friend_user_id = user_id;
	helpers.friends_data(req,res,constants,request,client,helpers).then(friend_data => {
		var friends = []
		for (var data of friend_data.friends) {
			friends.push(data.id);
		}
		var found = false;
		var found_id;
		for( var id of friends) {
			if(id == friend_user_id) {
				found = true;
				found_id = id;
				break;
			}
		}

		friends = friends.filter(id => id != found_id);

		if(!found) {
			res.status(400).send('Bad Request: No friend found with such user_id');
			return;
		}

		const query = { _id: user_id };
		const updateFriend = {  $set: { friends: friends } };

		const promise = new Promise(function(resolve,reject) {
			client.collection(constants.database.friends_collection).updateOne(query,updateFriend,function(err, response) {
			if(err) {
				reject({http_code:500,error_message:'Database Error: Could not remove friend'});
				return;
			}
			resolve({http_code:200,message:'Sucessfully removed friend'});
			return;
			});
		});

		promise.then(success => {
			res.status(success.http_code).send(success.message);
			return;
		}, err => {
			res.status(err.http_code).send(err.error_message);
			return;
		});
	});
}