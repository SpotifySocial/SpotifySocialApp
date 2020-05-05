module.exports = function(req,res,constants,request,helpers,client,user_id) {
	helpers.friends_data(req,res,constants,request,client).then(friend_data => {
		const requests = []
		for (var data of friend_data.requests) {
			requests.push(data.id);
		}
		requests.push(user_id);
		const query = { _id: req.session.user_id };
		const updateMongo = {  $set: { requests: requests } };
		client.collection(constants.database.friends_collection).updateOne(query,updateMongo,function(err, response) {
			if(err) {
				res.status(500).send('Database Error: Could not add friend request');
				return;
			}
			res.status(200).send('Successfully Added friend request');
			return;
		});
	}, error => {
		res.status(error.http_code).send(error.error_message);
		return;
	});
}