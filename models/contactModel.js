const mongoose = require("mongoose");

// object that has the contact table 
const contactSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required:[true, "Please add contact name"]
    },
    email: {
        type: String,
        required:[true, "Please add contact email"]
    },

    phone: {
        type: String,
        required:[true, "Please add contact number"]
    }

},{
    timestamp: true,
});

const Contact  = mongoose.model('Contact', contactSchema) // may not work

module.exports = Contact


