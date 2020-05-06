module.exports = function(id,token,client,constants,res) {
	client.collection(constants.database.token_collection).find({_id:'Token'}).toArray(function(err, docs) {
		if(err) {
			res.status(500).send('Database Update Error');
			return;
		}

		const ids = docs[0].ids;
		var tokens = docs[0].tokens;

		for( i in ids){
			if(ids[i] == id)
				tokens[i] = tokens;
		}


		client.collection(constants.database.token_collection).deleteOne({_id:'Token'}, function(err, result) {
			if(err) {
			res.status(500).send('Database Update Error');
			return;
			}

			client.collection(constants.database.token_collection).insertMany([{
				_id: 'Token', ids: ids, tokens: tokens
			}],function(err, result) {
				if(err) {
					reject(err);
					return;
				}

				next();
				return;
			});
		});
	});
}