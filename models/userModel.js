const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

// Object that has the user table

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Plsease add a username"],
        unique: [true, "Username already in use"]
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: [true, "Email already in use"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }

},
{timestamp: true}
);

const User = mongoose.model('User', userSchema)
module.exports = User;
