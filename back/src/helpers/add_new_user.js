module.exports = function(client,constants,ids,curr_id) {
	return new Promise(function(resolve, reject){
		client.collection(constants.database.users_collection).deleteOne({}, function(err, result) {
				if(err) {
					reject(err);
					return;
				}
			client.collection(constants.database.users_collection).insertMany([{
				id: ids
			}],function(err, result) {
				if(err) {
					reject(err);
					return;
				}
				client.collection(constants.database.friends_collection).insertMany([{
					_id: curr_id, requests: [], sent: [], friends: []
				}])
				resolve('ok');
			});
		});
	});
}