const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id = '5c66fd1fbac3552b497cb1b8';
var userId = '5c467b7634e8236df46ce4fb';

// if (!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }
// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos: ', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo){
// 		return console.log('id not found');
// 	}
// 	console.log('Todo by id: ', todo);
// }).catch((err) => {
// 	console.log(err);
// });

User.findById(userId).then((user) => {
	if (!user){
		return console.log('Cannot find user');
	}
	console.log('User by id: ', user);
}).catch((err) => {
	console.log(err);
})