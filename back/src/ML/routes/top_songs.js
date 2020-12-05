module.exports = async function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopSongs(constants,request,access_token));
	Promise.all(promises).then(async function(data) {
		const allData = {};
		for(const user_index in data) {
			const key = req.session.ids[user_index];
			allData[key] = data[user_index].items.map(song => song['id']);
		}
		res.status(200).send(allData);
	}, reject => {
		res.status(400).send('Could not get top songs for all users');
	})
}
