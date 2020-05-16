module.exports = function(req,res,next,constants,request,client,helpers) {
	return new Promise(function(resolve,reject) {
		helpers.fetchUserSimilarity(constants,{},client).then(users => {
			client.collection(constants.database.users_collection).find({_id:'Users'}).toArray(function(err, docs) {
				if(err) {
					reject({http_code: 500, error_message: 'Database Error: Error finding Users'});
					return;
				}

				const all_ids = docs[0].id;
				const db_ids = users.map(user => user._id);

				if(db_ids.length == all_ids.length) {
					resolve('ok');
					return;
				}

				var ids_to_add = all_ids.filter(curr_id => !db_ids.includes(curr_id));

				var add_elems = ids_to_add.map(function(x) { return { _id: x, friends: [], similarity: [] }; });

				console.log(add_elems);

				client.collection(constants.database.similarity_collection).insertMany(add_elems, function(err2,dss) {
					if(err2) {
						console.log(err2);
						reject({http_code: 500, error_message: 'Database Error: Error updating similarity'});
						return;
					}

					resolve('ok');
					return;
				});
			});
		}, err3 => {
			reject({http_code: 500, error_message: 'Database Error: Error finding Users'});
			return;
		});
	});
}