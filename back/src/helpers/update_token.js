module.exports = function(req,res,next,constants,client) {
	client.collection(constants.database.token_collection).find({_id:'Token'}).toArray(function(err, docs) {
		if(err) {
			res.status(500).send('Database Update Error');
			return;
		}

		var ids;
		var tokens;

		if(!docs || docs.length == 0) {
			ids = [];
			tokens = [];
		}

		else {
			ids = docs[0].ids || [];
			tokens = docs[0].tokens || [];
		}

		const user_id = req.session.user_id;
		const token = req.session.refresh_token;

		var index = -1;
		for(var i in ids) {
			if(user_id == ids[i]) {
				index = i;
				break;
			}
		}

		if(index != -1 && tokens[index] == token) {
			req.token = false;
			next();
			return;
		}

		if(index == -1) {
			ids.push(user_id);
			tokens.push(token);
		}

		else{
			tokens[index] = token;
		}

		client.collection(constants.database.token_collection).updateOne({
			_id: 'Token'} , { $set : { ids: ids, tokens: tokens
		}},function(err, result) {
			if(err) {
				res.status(500).send('Database Update Error');
				return;
			}

			next();
			return;
		});
	});
}