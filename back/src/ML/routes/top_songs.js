module.exports = async function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopSongs(constants,request,access_token));
	Promise.all(promises).then(async function(data) {
		const allData = {};
		for(var user_index in data) {
			var key = req.session.ids[user_index];
			var song_ids = data[user_index].items.map(song => song['id'])
			allData[key] = song_ids
		}
		res.status(200).send(allData);
		return;
	}, reject => {
		res.status(400).send('Could not get top songs for all users');
	})
}