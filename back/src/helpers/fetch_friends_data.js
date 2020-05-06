
module.exports = function(req,res,constants,request,client,helpers,user_id) {
	return new Promise(function(resolve, reject){
      	const curr_id = user_id || req.session.user_id;
      	const access_token = req.session.access_token;
		client.collection(constants.database.friends_collection).find({'_id':curr_id}).toArray(function(err, docs) {
			if(err) {
				reject({http_code: 500, error_message: 'Database Error: Cannot find userid'});
  				return;
			}
			
			if(docs.length == 0 || !docs) {
				resolve({friends:[], requests: [], sent: []});
  				return;
			}
			const friends = docs[0].friends || [];
			const requests = docs[0].requests || [];
			const sent = docs[0].sent || [];
			const friendData = [];
			const requestData = [];
			const sentData = [];

			if(friends.length == 0 && requests.length == 0 && sent.length == 0) {
				resolve({friends:[], requests: [], sent: []});
  				return;
			}

			const promises = []
			promises.push(helpers.profileData(friends,request,constants,access_token));
			promises.push(helpers.profileData(requests,request,constants,access_token));
			promises.push(helpers.profileData(sent,request,constants,access_token));

			Promise.all(promises).then(data => {
				resolve({friends: data[0], requests: data[1], sent: data[2]});
				return;
				
			}, err => {
				reject({http_code: 500, error_message: 'Internal Server Error! Failed to fetch friend data from ID'});
  				return;
			});
		});
	});
}


