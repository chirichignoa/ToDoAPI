let validator = require('validator');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let _ = require('lodash');

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

    //this.tokens = this.tokens.concat([{ access, token }]);

    return this.save().then(() => {
        return token;
    });
}

userSchema.statics.findByToken = function(token) {
    // let decoded;
    // let User = this;
    // try {
    //     decoded = jwt.verify(token, 'abc123');
    // } catch (e) {
    //     return Promise.reject();
    // }
    // return this.find({
    //     '_id': decoded._id,
    //     'tokens.token': token,
    //     'tokens.access': 'auth'
    // });
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

let User = mongoose.model('User', userSchema);

module.exports = { User }