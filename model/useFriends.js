const mongoose = require("mongoose")

const FriendsSchema = mongoose.Schema({
    user_id: {
        type: String,
        ref: "users"
    },
    request: {
        type: String,
        ref: "users"
    },
    status: String,
    commit: String
}, { timestamps: true })

const FriendModel = mongoose.model("friends", FriendsSchema)

module.exports = { FriendModel }