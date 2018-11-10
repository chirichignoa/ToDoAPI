const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();
let port = 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(200).send(JSON.stringify(doc, undefined, 2));
    }, (err) => {
        res.status(400).send(JSON.stringify({ error: err.message }, undefined, 2));
    });
});

app.get('/todos', (req, res) => {

});

app.listen(port, () => {
    console.log(`Listening at: ${port}`);
});