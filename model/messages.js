const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
    user_id: {
        type: String,
        ref: "users"
    },
    friend: {
        type: String,
        ref: "users"
    },
    messages: String,
    status: Boolean
}, { timestamps: true })

const MessageModel = mongoose.model("messages", MessageSchema)

module.exports = { MessageModel }