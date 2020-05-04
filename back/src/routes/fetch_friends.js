module.exports = function(req,res,constants,request,helpers,client) {
	helpers.friends_data(req,res,constants,request,client).then(friend_data => {
		res.status(200).send(friend_data.friends);
		return;
	}, error => {
		res.status(error.http_code).send(error.error_message);
		return;
	});
}
