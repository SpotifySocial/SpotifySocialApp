module.exports = function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopArtists(constants,request,access_token));
	Promise.all(promises).then(data => {
		const allData = []
		for(var i in data) {
			var key = req.session.ids[i]
			allData.push({ key: data[i]});
		}
		res.status(200).send(allData);
		return;
	}, reject => {
		res.status(400).send('Could not get top artists for all users');
	})
}