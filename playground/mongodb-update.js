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


    db.collection('todo').findOneAndUpdate({
        id: new ObjectID("5be3919faefda8057ea5f61b")
    }, {
        $set: {
            completed: true
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    client.close();
    console.log('Connection closed.');
});