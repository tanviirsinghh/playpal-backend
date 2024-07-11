const { mongoose } = require('mongoose')

const ScheduleSchema = mongoose.Schema({
    user_team_id: {
        type: String,
        ref: users
    },
    opponent_id: String,
    date_of_match: String,
    place_of_match: String,
    overs: Number,
    number_of_players: String
}, { timestamps: true })

const ScheduledMatchModel = mongoose.model("scheduled_matches", ScheduleSchema)

module.exports = { ScheduledMatchModel }