const mongoose = require("mongoose");
const uniqid = require('uniqid'); 
const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please add email"],
        unique: true,

    },
    password: {
        type: String,
        required: [true, "please add password"],
    },
    typeUser: {
        type: String,
        required: [true, "please add type user"],
        default: "user"
    },
    cash: {
        type: Number,
        required: [true, "please add cash "],
        default: 0
    },
    credit: {
        type: Number,
        required: [true, "please add credit "],
        default: 0
    },
    passportId: {
        type: String,
        required: [true, "please add passport Id "],
        unique: true,
    }
});

module.exports = mongoose.model("Users", UsersSchema);