var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// Middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) => {
		res.status(400).send(err);
	});
});

// Get individual todo by id
app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectId.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo)
		{
			return console.log(`Cannot locate todo with id of ${id}`);
		}
		console.log({todo});
	}).catch((err) => {
		res.status(400).send();
	});
});

app.listen(3000, () => {
	console.log('Listening on port 3000...');
})

module.exports = {app};