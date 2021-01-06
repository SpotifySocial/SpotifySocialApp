module.exports = async function(req,res,constants,request,helpers) {
	const promises = req.session.access_tokens.map(access_token => helpers.fetchTopSongs(constants,request,access_token));
	Promise.all(promises).then(async function(data) {
		let all_data = [];
		let audio_analysis_prom = [];
		for(const user_index in data) {
			let curr_data = {};
			curr_data['user_id'] = req.session.ids[user_index];
			const song_ids = data[user_index].items.map(song => song['id']);
			curr_data['songId'] = song_ids[0];
			all_data.push(curr_data);
			audio_analysis_prom.push(helpers.fetchAudioFeatures(constants,request,req.session.access_tokens[user_index],[curr_data['songId']]));
		}
		Promise.all(audio_analysis_prom).then(async function(feature_data) {
			for(const user_index in feature_data) {
				all_data[user_index]['features'] = feature_data[user_index];
			}
			res.status(200).send(all_data);
		}, reject => {
		res.status(400).send('Could not get top songs for all users');
		})
	}, reject => {
		res.status(400).send('Could not get top songs for all users');
	})
}
