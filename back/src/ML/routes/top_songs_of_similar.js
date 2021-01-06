function getMatchId(all_ids,curr_id) {
	let found = -1;
	for(const index in all_ids) {
		if(all_ids[index] === curr_id){
			found = index;
			break;
		}
	}
	return found;
}


module.exports = function(req,res,constants,client,helpers,request) {
	helpers.fetchUserSimilarity(constants,{},client).then(users => {
		const curr_id = req.body.user_id;
		const all_tokens = req.session.access_tokens;
		const all_ids = req.session.ids;
		const found = getMatchId(all_ids, curr_id);
		if(found === -1) {
			res.status(400).send('Could not get find user');
			return;
		}

		helpers.fetchTopSongs(constants,request,all_tokens[found]).then(songs => {
			let final_ids = [];
			final_ids.push(curr_id);
			let promises = [];
			const db_ids = users.map(user => user._id);
			// Currently sending back music of any 5 ids, this will be changed after we have similarity criterion
			for(const user_id of db_ids) {
				if(user_id === curr_id) {
					continue;
				}
				const found = getMatchId(all_ids, user_id);
				final_ids.push(user_id)
				promises.push(helpers.fetchTopSongs(constants,request,all_tokens[found]))
			}
			Promise.all(promises).then(song_data => {
				let song_ids = []
				let final_final_ids = []
				for(const i in final_ids) {
					const curr_song_ids = [];
					let curr_id_songs = song_data[i];
					if(curr_id_songs) {
						curr_id_songs = curr_id_songs.items
						for(const j in curr_id_songs) {
							curr_song_ids.push(curr_id_songs[j].id)
						}
						song_ids.push(curr_song_ids)
						final_final_ids.push(final_ids[i])
					}
				}
				promises = []
				for (const i in final_final_ids) {
					const found = getMatchId(all_ids, final_final_ids[i]);
					if(found === -1) {
						res.status(400).send('Could not get find user');
						return;
					}
					promises.push(helpers.fetchAudioFeatures(constants,request,all_tokens[found], song_ids[i]))
				}

				Promise.all(promises).then(audio_data => {
					res.status(200).send({
						ids: final_final_ids,
						data: audio_data
					})
				},reject => {
					res.status(400).send('Could not get song analysis for friends');
				});
			},reject => {
				res.status(400).send('Could not get saved songs for all users');
			});
		}, reject => {
			res.status(400).send('Could not get top songs for the user');
		});
	},reject => {
		res.status(400).send('Could not get similarity for all users');
	});
}
