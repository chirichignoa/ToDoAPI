let validator = require('validator');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let _ = require('lodash');
let bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        },
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function() {
    return _.pick(this.toObject(), ['_id', 'email']);
}

userSchema.methods.generateAuthToken = function() {
    let access = "auth";
    let token = jwt.sign({
        _id: this._id.toHexString(),
        access
    }, 'abc123').toString();

    this.tokens.push({
        access,
        token
    });
    return this.save().then(() => {
        return token;
    });
}

userSchema.methods.removeToken = function(token) {
    var user = this;
    user.update({
        $pull: {
            tokens: { token }
        }
    })
}

userSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

userSchema.statics.findByCredentials = function(email, password) {
    var User = this;
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res === true) {
                    resolve(user);
                } else {
                    reject();
                }
            })

        });
    });
}

userSchema.pre('save', function(next) {

    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

let User = mongoose.model('User', userSchema);

module.exports = { User }