// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err){
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// delete many
	// db.collection('Users').deleteMany({name: 'Shawn Pitts'});

	// delete one
	// db.collection('Todos').deleteOne({text: 'Eat dinner'}).then((result) => {
	// 	console.log(result);
	// });

	// find one and delete
	db.collection('Users').findOneAndDelete({
		_id: new ObjectID('5c4651aacf48fdf1a78ab1f4')
	}).then((result) =>{
		console.log(JSON.stringify(result, undefined, 2));
	});


	// client.close();
});