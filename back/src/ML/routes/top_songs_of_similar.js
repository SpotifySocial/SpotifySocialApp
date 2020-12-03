function getMatchId(all_ids,curr_id) {
	var found = -1
	for(index in all_ids) {
		if(all_ids[index] == curr_id){
			found = index;
			break;
		}
	}
	return found;
}


module.exports = function(req,res,constants,client,helpers,request) {
	helpers.fetchUserSimilarity(constants,{},client).then(users => {
		curr_id = req.body.user_id
		all_tokens = req.session.access_tokens
		all_ids = req.session.ids
		console.log(all_ids)
		var found = getMatchId(all_ids,curr_id)
		if(found == -1) {
			res.status(400).send('Could not get find user');
			return;
		}

		helpers.fetchTopSongs(constants,request,all_tokens[found]).then(songs => {
			finalJson = {}
			final_ids = []
			final_data = []
			final_ids.push(curr_id)
			final_data.push(songs)
			promises = []
			const db_ids = users.map(user => user._id);
			// Currently sending back music of any 5 ids, this will be changed after we have similarity criterion
			for(user_id of db_ids) {
				if(user_id == curr_id) {
					continue;
				}
				var found = getMatchId(all_ids,user_id);
				final_ids.push(user_id)
				promises.push(helpers.fetchTopSongs(constants,request,all_tokens[found]))
			}
			Promise.all(promises).then(song_data => {
				song_ids = []
				final_final_ids = []
				for(i in final_ids) {
					var curr_song_ids = []
					var curr_id_songs = song_data[i]
					if(curr_id_songs) {
						curr_id_songs = curr_id_songs.items
						for(j in curr_id_songs) {
							curr_song_ids.push(curr_id_songs[j].id)
						}
						song_ids.push(curr_song_ids)
						final_final_ids.push(final_ids[i])
					}				
				}
				promises = []
				for (i in final_final_ids) {
					var found = getMatchId(all_ids,final_final_ids[i])
					if(found == -1) {
						res.status(400).send('Could not get find user');
						return;
					}
					promises.push(helpers.fetchSongAnalysis(constants,request,all_tokens[found], song_ids[i]))
				}

				Promise.all(promises).then(audio_data => {
					res.status(200).send({
						ids: final_final_ids,
						data: audio_data
					})
					return
				},reject => {
					res.status(400).send('Could not get song analysis for friends');
					return;
				});
			},reject => {
				res.status(400).send('Could not get saved songs for all users');
				return;
			});
		}, reject => {
			res.status(400).send('Could not get top songs for the user');
			return;
		});
	},reject => {
		res.status(400).send('Could not get similarity for all users');
		return;
	});
}