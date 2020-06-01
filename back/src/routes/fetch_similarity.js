module.exports = function(req,res,constants,request,helpers,client) {
	client.collection(constants.database.similarity_collection).find({_id: req.session.user_id}).toArray(function(err, docs) {
		if(err){
			res.status(500).send("Could not fetch user similarity");
			return;
		}
		res.send(docs[0]);
		return;
	});
}