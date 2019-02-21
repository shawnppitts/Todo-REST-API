var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
// "secret" property for formatting json
app.set('json spaces', 2);
const port = process.env.PORT || 3000;
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
		res.send({todo});
	}).catch((err) => {
		res.status(400).send();
	});
});

app.delete('/todos/:id', (req, res) => {
	// Step 1: Get id
	var id = req.params.id;
	// Step 2: Validate the object Id and return 404 if not valid
	if (!ObjectId.isValid(id))
	{
		return res.status(404).send();
	}
	// Step 3: Remove the todo by Id
	Todo.findByIdAndRemove(id).then((todo) => {
		// If no todo is found with id passed
		if (!todo)
		{
			return res.status(404).send();
		}
		// Success
		res.send({todo});
	}).catch((err) => {
		// Error
		res.status(400).send();
	});

});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})

module.exports = {app};