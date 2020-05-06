module.exports = {
	currId: require('./fetch_current_profile'),
	reset: require('./token_reset'),
	users: require('./fetch_all_users'),
	add_users: require('./add_new_user'),
	friends_data: require('./fetch_friends_data'),
	profileData: require('./fetch_profile_from_ids'),
	updateToken: require('./update_token')
}