const mongoose = require('mongoose');

const config = {
    PORT: 61183,
    DB_URL: 'ds161183.mlab.com:',
    DB_NAME: 'todoapp',
    DB_USERNAME: 'todoapp',
    DB_PASS: 'todoapp123'
};

// mongodb://<dbuser>:<dbpassword>@ds161183.mlab.com:61183/todoapp

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.DB_USERNAME}:${config.DB_PASS}@${config.DB_URL}${config.PORT}/${config.DB_NAME}`, { useNewUrlParser: true });

module.exports = { mongoose };