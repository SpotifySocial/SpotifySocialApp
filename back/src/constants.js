module.exports = {
	stateCookie : 'user_auth_cookie',
	authScope : 'user-read-private user-read-email',
	spotifyAuthUrl : 'https://accounts.spotify.com/authorize?',
	spotifyTokenUrl : 'https://accounts.spotify.com/api/token',
	backendRedirectDomain: 'http://localhost:'.concat(process.env.PORT),
	backendRedirectRoute: '/',
	appRedirectDomain: 'http://localhost:3000',
	appOkRedirectRoute: '/',
	appErrorRedirectRoute : '/error'
}