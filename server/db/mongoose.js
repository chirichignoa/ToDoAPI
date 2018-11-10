const mongoose = require('mongoose');

const config = {
    PORT: 27017,
    DB_URL: 'mongodb://localhost:',
    DB_NAME: 'todoapp'
};

mongoose.Promise = global.Promise;
mongoose.connect(`${config.DB_URL}${config.PORT}/${config.DB_NAME}`, { useNewUrlParser: true });

module.exports = { mongoose };