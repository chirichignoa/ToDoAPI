const mongoClient = require('mongodb').MongoClient;
const config = {
    PORT: 27017,
    DB_URL: 'mongodb://localhost:',
    DB_NAME: 'TodoApp'
};

mongoClient.connect(`${config.DB_URL}${config.PORT}/${config.DB_NAME}`, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');
    const db = client.db('TodoApp');

    // db.collection('todo').find({ completed: true }).toArray().then((docs) => {
    //     console.log('To-do');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Error', err);
    // });

    db.collection('todo').find().count().then((count) => {
        console.log(`To-dos count: ${count}`);
    }, (err) => {
        console.log('Error', err);
    });

    db.collection('user').find({ name: "Agustin" }).count().then((count) => {
        console.log(`User count: ${count}`);
    }, (err) => {
        console.log('Error', err);
    });

    client.close();
    console.log('Connection closed.');
});