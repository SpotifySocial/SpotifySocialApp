module.exports = function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopArtists(constants,request,access_token));
	Promise.all(promises).then(data => {
		const allData = []
		for(const i in data) {
			const key = req.session.ids[i];
			const genres = data[i].items.map(artist_data => artist_data['genres']);
			const user_data = {};
			user_data[key] = genres;
			allData.push(user_data);
		}
		res.status(200).send(allData);
	}, reject => {
		res.status(400).send('Could not get top artists for all users');
	})
}
