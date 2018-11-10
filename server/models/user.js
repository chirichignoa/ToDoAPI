let mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = { User }