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

    //delete Many
    db.collection('todo').deleteMany({ text: "Eat lunch" }).then((result) => {
        console.log(result);
    });

    //delete One
    db.collection('todo').deleteOne({ text: "Eat lunch" }).then((result) => {
        console.log(result);
    });

    //findOne and delete
    db.collection('todo').findOneAndDelete({ completed: false }).then((result) => {
        console.log(result);
    });

    db.collection('user').deleteMany({ name: "Agustin" }).then((result) => {
        console.log(result);
    });

    db.collection('user').findOneAndDelete({ _id: new ObjectID("5be3919faefda8057ea5f61c") }).then((result) => {
        console.log(result);
    });

    client.close();
    console.log('Connection closed.');
});