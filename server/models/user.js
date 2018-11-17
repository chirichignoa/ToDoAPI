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

    return this.save().then(() => {
        return token;
    });
}

let User = mongoose.model('User', userSchema);

module.exports = { User }