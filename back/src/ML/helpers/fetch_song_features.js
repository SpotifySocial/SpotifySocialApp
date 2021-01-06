module.exports = function(constants,request,access_token,song_id_array) {
	const option = {
		url: constants.spotifyGetTrackFeatures + song_id_array.join(),
		headers : { 'Authorization': 'Bearer ' + access_token },
		json: true
	}

	return request.get(option);
}