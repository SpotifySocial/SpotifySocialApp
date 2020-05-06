

module.exports = function(client,constants,helpers,request,access_token,only_ids) {
	return new Promise(function(resolve, reject){
		client.collection(constants.database.users_collection).find({}).toArray(function(err, docs) {
			if(err) {
				reject({http_code: 500, error_message: 'Database Error: Error finding Users'});
				return;
			}

			if(!docs || docs.length == 0){
				resolve([]);
				return;
			}

			const ids = docs[0].id;
			if(only_ids) {
				resolve(ids);
				return;
			}
			helpers.profileData(ids,request,constants,access_token).then(user_data => {
				console.log(user_data);
				resolve(user_data);
				return;
			}, reject => {
				reject({http_code: 400, error_message: 'Could not fetch user data'});
			});
		});
	});
}