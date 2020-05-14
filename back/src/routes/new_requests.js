module.exports = function(req,res,constants,request,helpers,client,user_id) {
	const request_user_id = user_id;
	const sent_user_id = req.session.user_id;
	helpers.friends_data(req,res,constants,request,client,helpers,request_user_id).then(friend_data => {
		const requests = []
		for (var data of friend_data.requests) {
			requests.push(data.id);
		}
		requests.push(sent_user_id);
		const query = { _id: request_user_id };
		const updateMongo = {  $set: { requests: requests } };
		client.collection(constants.database.friends_collection).updateOne(query,updateMongo,function(err, response) {
			if(err) {
				res.status(500).send('Database Error: Could not add friend request');
				return;
			}

			helpers.friends_data(req,res,constants,request,client,helpers,sent_user_id).then(friend_data_2 => {
				const sent = []
				for (var data of friend_data_2.sent) {
					sent.push(data.id);
				}
				sent.push(request_user_id);

				const query_2 = { _id: sent_user_id };
				const updateMongo_2 = {  $set: { sent: sent } };
				client.collection(constants.database.friends_collection).updateOne(query_2,updateMongo_2,function(err, response) {
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
		});
	});
}