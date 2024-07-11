const { mongoose } = require('mongoose')

const TeamSchema = mongoose.Schema({
    teamName: String,
    user_id: {
        type: String,
        ref: "users"
    },
    email: String,
    phoneNumber: String,
    noOfPlayers: String,
    substitute: String,
    homeGround: String,
    addressOfGround: String,
    pinCode: String,
    games: {
        type: String,
        enum: ["cricket", "football", "badminton", "volleyball", "tenis", "basketball"],
        required: true
    },
    description: String,
    teamMembers: String,
    members: String

}, { timestamps: true })

const TeamModel = mongoose.model("team", TeamSchema)

module.exports = { TeamModel } 