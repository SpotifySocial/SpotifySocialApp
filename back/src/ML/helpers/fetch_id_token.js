module.exports = function(req,res,next,constants,request,client) {
	return new Promise(function(resolve,reject) {
		client.collection(constants.database.token_collection).find({_id:'Token'}).toArray(function(err, docs) {
		if(err) {
			reject({http_code:500, error_message: 'Database Error: Could not fetch user ids and refresh tokens'});
			return;
		}
		resolve({ids: docs[0].ids, tokens:docs[0].tokens});
		return;
		});
	});
}