const { mongoose } = require("mongoose");
const { type } = require("os");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    phoneNumber: Number,
    email: String,
    address: String,
    password: String,
    team: String,
    friends: Object,
},
    { timestamps: true })


const UserModel = mongoose.model("users", userSchema);


module.exports = UserModel;