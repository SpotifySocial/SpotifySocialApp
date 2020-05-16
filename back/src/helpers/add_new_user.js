module.exports = function(client,constants,ids,curr_id) {
	return new Promise(function(resolve, reject){
		client.collection(constants.database.users_collection).updateOne({_id:'Users'},{ $set : {
				id: ids
			}
		},function(err, result) {
			if(err) {
				reject(err);
				return;
			}
			client.collection(constants.database.friends_collection).insertOne({
				_id: curr_id, requests: [], sent: [], friends: []
			},function(err, result) {
				if(err) {
					reject(err);
					return;
				}
				resolve('ok');
			});
		});
	});
}