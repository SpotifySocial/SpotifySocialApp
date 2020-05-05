module.exports = function(MongoClient,uri,constants) {
	const client = new MongoClient(uri, { useNewUrlParser: true });
	return new Promise(function(resolve, reject){
		client.connect(err => {
			if(err) {
				reject(err);
			}

			resolve(client.db(constants.database.database_name));
		});
	});
}