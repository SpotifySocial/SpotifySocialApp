module.exports = function(req,res,constants,request,helpers,client) {
	helpers.users(client,constants).then(users => {
		res.status(200).send(users);
		return;
	}, error => {
		res.status(error.http_code).send(error.error_message);
		return;
	});
}