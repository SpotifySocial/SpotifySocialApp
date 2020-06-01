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
			name: song.name,
			id: song.id
		};

		const getTrack = constants.spotifyGetTrack + returVal.id;
		const getTrackOption = {
			url: getTrack,
			headers : { 'Authorization': 'Bearer ' + req.session.access_token },
			json: true
		}

		request.get(getTrackOption).then(track => {
			returVal['image'] = track.album.images;
			res.status(200).send(returVal);
			return;
		}).catch(err2 => {
			res.status(400).send("Error in getting song data");
			return;
		});
		
	}).catch(err => {
		res.send(400).send("Error in getting song data");
		return;
	});
}