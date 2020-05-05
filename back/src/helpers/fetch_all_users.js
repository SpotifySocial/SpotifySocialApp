module.exports = function(client,constants) {
	return new Promise(function(resolve, reject){
		client.collection(constants.database.users_collection).find({}).toArray(function(err, docs) {
			if(err) {
				reject({http_code: 500, error_message: 'Database Error: Error finding Users'});
				return;
			}
			resolve({id: docs[0].id, display_name:docs[0].display_name});
		});
	});
}