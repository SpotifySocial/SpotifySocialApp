module.exports = function(constants,request,access_token,id) {
	const option = {
		url: constants.spotifyArtistInfoUrl + id,
		headers : { 'Authorization': 'Bearer ' + access_token },
		json: true
	}

	return request.get(option);
}