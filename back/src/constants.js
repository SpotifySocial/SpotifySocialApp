module.exports = {
	stateCookie : 'user_auth_cookie',
	authScope : 'user-read-private user-read-email',
	spotifyAuthUrl : 'https://accounts.spotify.com/authorize?',
	spotifyTokenUrl : 'https://accounts.spotify.com/api/token',
	spotifyProfileUrl: 'https://api.spotify.com/v1/me',
	backendRedirectDomain: 'http://localhost:'.concat(process.env.PORT),
	backendRedirectRoute: '/',
	appRedirectDomain: 'http://localhost:3000',
	appOkRedirectRoute: '/',
	appErrorRedirectRoute : '/error',
	loggedInCookieKey: 'Logged_in',
	tokenCookieKey: 'token',
	database : {
		database_name: 'spotifySocial',
		profiles_collection: 'Profiles',
		friends_collection: 'Friends',
		users_collection: 'AllUsers'
	}
}