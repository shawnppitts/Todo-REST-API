// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID('5c465176cf48fdf1a78ab1d7')
	}, {
		$set: {
			name: 'Shawn Pitts'
		},
		$inc: {
			age: -3
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
	// client.close();
});