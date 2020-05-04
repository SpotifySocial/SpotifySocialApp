module.exports = function(client,constants) {
	return new Promise(function(resolve, reject){
		client.collection(constants.database.users_collection).find({}).toArray(function(err, docs) {
			if(err) {
				reject(err);
				return;
			}
			resolve(docs[0]);
		});
	});
}