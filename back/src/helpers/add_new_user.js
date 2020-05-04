module.exports = function(client,constants,ids,names) {
	return new Promise(function(resolve, reject){
		client.collection(constants.database.users_collection).deleteOne({}, function(err, result) {
				if(err) {
					reject(err);
					return;
				}
			client.collection(constants.database.users_collection).insertMany([{
				id: ids, display_name: names
			}],function(err, result) {
				if(err) {
					reject(err);
					return;
				}
				resolve('ok');
			});
		});
	});
}