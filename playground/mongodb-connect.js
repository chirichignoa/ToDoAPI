// const mongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const config = {
    PORT: 27017,
    DB_URL: 'mongodb://localhost:',
    DB_NAME: 'TodoApp'
};

let objId = new ObjectID();
console.log(objId);

mongoClient.connect(`${config.DB_URL}${config.PORT}/${config.DB_NAME}`, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    db.collection('todo').insertOne({
        text: 'Something to do',
        completed: false // this field logs the todo's status
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert a todo.', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.collection('user').insertOne({
        name: 'Agustin Chirichigno',
        age: 24,
        location: 'Tandil'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert a user.', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    client.close();
    console.log('Connection closed.');
});