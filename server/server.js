const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const { ObjectID } = require('mongodb');

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(200).send(doc); //JSON.stringify(doc, undefined, 2));
    }, (err) => {
        res.status(400).send(err); //JSON.stringify({ error: err.message }, undefined, 2));
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((docs) => {
        res.status(200).send({ docs });
    }, (error) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(400).send("The request does not have necesary params.");
    }
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        return res.status(200).send(todo);
    }).catch((err) => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Listening at: ${port}`);
});

module.exports = { app };