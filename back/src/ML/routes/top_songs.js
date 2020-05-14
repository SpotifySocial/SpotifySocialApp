module.exports = async function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopSongs(constants,request,access_token));
	Promise.all(promises).then(async function(data) {
		const allData = [];
		for(var user_index in data) {
			var key = req.session.ids[user_index];
			var access_token = req.session.access_tokens[user_index];
			var curr_user_data = [];
			for(var song of data[user_index].items) {
				var curr_song = {};
				curr_song['id'] = song['id'];
				curr_song['artists'] = song['artists'].map(artist => artist.id);
				curr_song['genres'] = [];
				for(var artist_id of curr_song['artists']) {
					var artist_info = await helpers.fetchArtistInfo(constants,request,access_token,artist_id);
					curr_song['genres'].push(artist_info.genres);
				}
				curr_user_data.push(curr_song);
			}

			allData.push({ key: curr_user_data});
		}

		res.status(200).send(allData);
		return;
	}, reject => {
		res.status(400).send('Could not get top songs for all users');
	})
}