module.exports = function(req,res,constants,request,helpers,client) {
	const option = {
		url: constants.spotifyTopSongUrl,
		headers : { 'Authorization': 'Bearer ' + req.session.access_token },
		json: true
	}

	request.get(option).then(songs => {
		const song = songs.items[Math.floor(Math.random() * songs.items.length)];
		const returVal = {
			artists: song.artists.map(artist => artist.name),
			url: song.external_urls.spotify,
			name: song.name
		};

		res.status(200).send(returVal);
	}).catch(err => {
		res.send(400).send("Error in getting song data");
	})
}