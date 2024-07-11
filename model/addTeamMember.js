const mongoose = require("mongoose")

const AddTeamMemberSchema = mongoose.Schema({
    user_id: {
        type: String,
        ref: "users"
    },
    player_id: {
        type: String,
        ref: "users"
    },
    status: String,
    commit: String
}, { timestamps: true })

const AddTeamMemberModel = mongoose.model("team_members", AddTeamMemberSchema)

module.exports = { AddTeamMemberModel }