module.exports = function(constants,query,client) {
	return new Promise(function(resolve,reject) {
		client.collection(constants.database.similarity_collection).find(query).toArray(function(err, docs) {
			if(err){
				reject({http_code:500, error_message: "Could not fetch user similarity"});
				return;
			}
			resolve(docs);
			return;
		});
	});
}