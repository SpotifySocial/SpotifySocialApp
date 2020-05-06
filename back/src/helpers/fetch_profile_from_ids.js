

module.exports = function(ids,request,constants,access_token){
	return new Promise(function(resolve,reject) {
		if(typeof ids == 'object' && ids.length == 0) {
			resolve([]);
			return;
		}
		if( typeof ids == 'string') {
			ids = [ids];
		}
		const options = []
		for (var id of ids) {
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
			}
			resolve(filtered_data);
			return;
		}, err => {
			reject(err);
			return;
		});
	});
}