const request = require('supertest');

const { app } = require('../server');

const { Todo } = require('../models/todo');
const { mongoose } = require('../db/mongoose');

const todos = [{ text: 'First dummy todo' }, { text: 'Second dummy todo' }]

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

afterAll(() => mongoose.disconnect());

describe('POST /todos', () => {
    it('Should it create a new to-do', (done) => {
        let text = 'Test to-do text';
        request(app)
            .post('/todos')
            .send({ text: text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toEqual(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    }, 30000);

    it("Should not create todo with invalid body data", (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    }, 30000);
});

describe("GET /todos", () => {

    it("Should get all todos", () => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
            })
    }, 30000);


});