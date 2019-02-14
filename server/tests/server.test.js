const expect = require('expect');
const request = require('supertest');
const assert = require('assert');

var {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
	Todo.remove({}).then(() => {
		done();
	})
});

describe('POST /todos', () => {
	it('Should create a new todo', (done) => {
		var text = 'Test todo text';

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
					assert.equal(todos.length, 1);
					assert.equal(todos[0].text, text);
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
					assert.equal(todos.length, 0);
					done();
				}).catch((err) => {
					done(err);
				})
			});
	})
});