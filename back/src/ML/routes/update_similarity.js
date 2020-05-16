module.exports = function(req,res,constants,client,helpers) {
	helpers.fetchUserSimilarity(constants,{},client).then(users => {
		const db_ids = users.map(user => user._id);
		const promises = [];
		for(var curr of req.body.data) {
			const id1 = curr.user1;
			const id2 = curr.user2;
			const similarity = curr.cosine_similarity;

			var friends_id1  = users[db_ids.indexOf(id1)].friends;
			var similarity_id1 = users[db_ids.indexOf(id1)].similarity;
			var friends_id2  = users[db_ids.indexOf(id2)].friends;
			var similarity_id2 = users[db_ids.indexOf(id2)].similarity;

			var index_id1 = 0;
			var index_id2 = 0;

			for(var i in friends_id1) {
				if(friends_id1[i] == id2){
					index_id1 = i;
					break;
				}
			}

			for(var i in friends_id2) {
				if(friends_id2[i] == id1){
					index_id2 = i;
					break;
				}
			}

			friends_id1[index_id1] = id2;
			similarity_id1[index_id1] = similarity;

			friends_id2[index_id2] = id1;
			similarity_id2[index_id2] = similarity;

			promises.push(client.collection(constants.database.similarity_collection).updateOne({
			_id: id1} , { $set : { friends: friends_id1, similarity: similarity_id1
			}}));

			promises.push(client.collection(constants.database.similarity_collection).updateOne({
			_id: id2} , { $set : { friends: friends_id2, similarity: similarity_id2
			}}));
		}

		Promise.all(promises).then(success => {
			res.status(200).send('Successful!');
			return;
		},fail => {
			res.status(500).send('Database Error: Error updating similarity');
			return;
		});
	},err3 => {
		res.status(500).send('Database Error: Error finding Users');
		return;
	});
}