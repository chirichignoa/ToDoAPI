let { SHA256 } = require('crypto-js');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

// let message = "Im user number 3";

// let result = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Result: ${result}`);

// let data = {
//     id: 4
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecredata').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecredata').toString();
// if (resultHash === token.hash) {
//     console.log("Data wasn't changed");
// } else {
//     console.log("Data was changed, not trust");
// }

// let data = {
//     id: 10
// };

// let token = jwt.sign(data, "somesecretdata");
// console.log(token);

// let decoded = jwt.verify(token, "somesecretdata");
// console.log(decoded);

let password = '123abc!';
// bcrypt.genSalt(10, (error, salt) => {
//     bcrypt.hash(password, salt, (error, hash) => {
//         console.log(hash);
//     });

// });

let hashedPassword = '$2a$10$kdpZcMeU0QZyJHrcLT0voe5AyCoS7EQAV7M/HcheCYsNNry4oNHa2';

bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log(result);
})