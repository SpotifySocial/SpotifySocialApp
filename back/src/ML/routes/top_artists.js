module.exports = function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopArtists(constants,request,access_token));
	Promise.all(promises).then(data => {
		const allData = []
		for(var i in data) {
			var key = req.session.ids[i]
			var genres = data[i].items.map(artist_data => artist_data['genres'])
			console.log(key)
			console.log(genres)
			var user_data = {}
			user_data[key] = genres
			allData.push(user_data);
		}
		res.status(200).send(allData);
		return;
	}, reject => {
		res.status(400).send('Could not get top artists for all users');
	})
}