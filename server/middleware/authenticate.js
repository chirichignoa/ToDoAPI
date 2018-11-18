const { User } = require('../models/user');

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
            if (!user) {
                return Promise.reject(); //res.status(400).send(JSON.stringify("tremendoerror"));
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch((e) => {
            res.status(401).send();
        });
}

module.exports = { authenticate };