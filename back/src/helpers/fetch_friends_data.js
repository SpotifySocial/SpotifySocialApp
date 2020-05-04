module.exports = function(req,res,constants,request,client) {
	return new Promise(function(resolve, reject){
		const access_token = req.session.access_token;
		console.log(access_token);
		const options = {
	      url: constants.spotifyProfileUrl,
	      headers: { 'Authorization': 'Bearer ' + access_token },
	      json: true
	    };

	    request.get(options, function(error, response, body) {
	      if(error) {
	      	res.status(400).send('Bad Request, Failed to get Profile');
	      	return;
	      }
	      	const curr_id = body['id'];
	      	console.log(curr_id);
			client.collection(constants.database.friends_collection).find({'_id':curr_id}).toArray(function(err, docs) {
				if(err) {
					reject({http_code: 500, error_message: 'Database Error: Cannot find userid'});
      				return;
				}
				console.log(docs);
				if(docs.length == 0) {
					resolve({friends:[], requests: []});
      				return;
				}
				const friends = docs[0].friends;
				const requests = docs[0].requests;
				const friendData = [];
				const requestData = [];

				console.log(friends);
				console.log(requests);
				if(friends.length == 0 && requests.length == 0) {
					resolve({friends:[], requests: []});
      				return;
				}

				const promises = []
				if(friends.length != 0) {
					promises.push(getFriendData(friends,request,constants,access_token));
				}
				if(requests.length != 0) {
					promises.push(getFriendData(requests,request,constants,access_token));
				}
				Promise.all(promises).then(data => {
					if(friends.length != 0 && requests.length != 0) {
						resolve({friends:data[0],requests:data[1]});
						return;
					}

					else if(friends.length != 0) {
						resolve({friends:data[0],requests:[]});
						return;
					}
					else {
						resolve({friends:[],requests:data[0]});
						return;

					}
					
				}, err => {
					reject({http_code: 500, error_message: 'Database Error: Error finding friends'});
      				return;
				});
				//resolve({friends:, requests: getFriendData(requests,request,constants,access_token)});
				//return;
			});
		});
	});
}


function getFriendData(friends,request,constants,access_token){
	return new Promise(function(resolve,reject) {
		const options = []
		for (var id of friends) {
			options.push({
				url: constants.spotifyUserUrl.replace('id',id),
				headers : { 'Authorization': 'Bearer ' + access_token },
				json: true
			});
		}

		const promises = options.map(option => request.get(option));
		Promise.all(promises).then(data => {
			const filtered_data = [];
			for( var body of data) {
				const curr_id = body['id'];
		        const curr_name = body['display_name'];
		        const spotifyUrl = body['external_urls']['spotify'];
		        const images = body['images'];
		        filtered_data.push({
		      	  'id': curr_id,
		      	  'display_name': curr_name,
		      	  'spotifyUrl' : spotifyUrl,
		      	  'images': images
		        });
		        resolve(filtered_data);

			}
			resolve(data);
			return;
		}, err => {
			reject(err);
			return;
		});
	});
}