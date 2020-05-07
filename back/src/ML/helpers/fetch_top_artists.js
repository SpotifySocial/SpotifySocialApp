module.exports = function(constants,request,access_token) {
	const option = {
		url: constants.spotifyTopArtistUrl,
		headers : { 'Authorization': 'Bearer ' + access_token },
		json: true
	}

	return request.get(option);
}