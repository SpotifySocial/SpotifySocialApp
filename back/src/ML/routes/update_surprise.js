module.exports = function(req,res,constants,client,helpers) {
	let update_promises = [];
	for(const user of req.body.data) {
		update_promises.push(client.collection(constants.database.surprise_collection).updateOne({
			_id: user.user_id} , { $set : { songId: user.song_id}}, { upsert: true }));
	}
	Promise.all(update_promises).then(success => {
		res.status(200).send('Successful!');
	},fail => {
		res.status(500).send('Database Error: Error updating Surprise');
		return;
	});
}