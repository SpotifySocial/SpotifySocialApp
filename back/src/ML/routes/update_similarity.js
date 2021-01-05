module.exports = function(req,res,constants,client,helpers) {
	helpers.fetchUserSimilarity(constants,{},client).then(users => {
		const db_ids = users.map(user => user._id);
		const promises = [];
		for(let curr of req.body.data) {
			const id1 = curr.user1;
			const id2 = curr.user2;
			const similarity = curr.cosine_similarity;

			let friends_id1 = [];
			let similarity_id1 = [];
			let friends_id2 = [];
			let similarity_id2 = [];

			if(db_ids.indexOf(id1) !== -1) {
				friends_id1 = users[db_ids.indexOf(id1)].friends
				similarity_id1 = users[db_ids.indexOf(id1)].similarity
			}

			if(db_ids.indexOf(id2) !== -1) {
				friends_id2 = users[db_ids.indexOf(id2)].friends
				similarity_id2 = users[db_ids.indexOf(id2)].similarity
			}

			let index_id1 = -1;
			let index_id2 = -1;

			for(let i in friends_id1) {
				if(friends_id1[i] == id2){
					index_id1 = i;
					break;
				}
			}

			for(let i in friends_id2) {
				if(friends_id2[i] == id1){
					index_id2 = i;
					break;
				}
			}

			if(index_id1 == -1) {
				friends_id1.push(id2);
				similarity_id1.push(similarity);
			}
			else {
				friends_id1[index_id1] = id2;
				similarity_id1[index_id1] = similarity;
			}

			if(index_id2 == -1) {
				friends_id2.push(id1);
				similarity_id2.push(similarity);
			}

			else {
				friends_id2[index_id2] = id1;
				similarity_id2[index_id2] = similarity;
			}
			
			promises.push(client.collection(constants.database.similarity_collection).updateOne({
			_id: id1} , { $set : { friends: friends_id1, similarity: similarity_id1
			}}, { upsert: true }));

			promises.push(client.collection(constants.database.similarity_collection).updateOne({
			_id: id2} , { $set : { friends: friends_id2, similarity: similarity_id2
			}}, { upsert: true }));
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