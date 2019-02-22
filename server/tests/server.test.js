const expect = require('expect');
const request = require('supertest');
const assert = require('assert');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'Complete Linear Algebra Homework'
}, {
	_id: new ObjectID(),
	text: 'Workout'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	});
});

describe('POST /todos', () => {
	it('Should create a new todo', (done) => {
		var text = 'Get oil changed';

		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res) => {
				assert.equal(res.body.text, text);
			})
			.end((err, res) => {
				if (err){
					return done(err);
				}

				Todo.find().then((todos) => {
					assert.equal(todos.length, 3);
					done();
				}).catch((err) => {
					done(err);
				})
			});
	});

	it('Should not create a new todo without text data', (done) => {
		var text = '';

		request(app)
			.post('/todos')
			.send({text})
			.expect(400)
			.end((err, res) => {
				if (err)
				{
					return done(err);
				}
				Todo.find().then((todos) => {
					assert.equal(todos.length, 2);
					done();
				}).catch((err) => {
					done(err);
				})
			});
	});
});


describe('GET /todos', () => {
	it('Should get all todos', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				assert.equal(res.body.todos.length, 2);
			})
			.end(done);
	});
});


describe('GET /todos/:id', () => {
	it('Should return todo doc', (done) => {
		request(app)
			// object id to string, use toHexString
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				assert.equal(res.body.todo.text, todos[0].text);
			})
			.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('Should remove todo', (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res) => {
				assert.equal(res.body.todo._id, hexId);
			})
			.end((err, res) => {
				if (err){
					return done(err);
				}

				// Query database using findById
				Todo.findById(hexId).then((todo) => {
					expect(todo).not.toBeTruthy();
					done();
				}).catch((err) => {
					done(err);
				});
			})
	
	});

	it('Should return 404 status if todo is not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
			.delete(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	});

	it('Should return status 404 if ObjectID is invalid', (done) => {
		request(app)
			.delete('/todos/abcdefg1234567')
			.expect(404)
			.end(done);
	});
})






