const mongoose = require("mongoose")

const TournamnetSchema = mongoose.Schema({
    // name: String,
    // type_of_game: String,
    // contact: String,
    // rank: String,
    // img: String,
    // start_date: String,
    // end_date: String,
    // total_team_participation: String,
    // minimum_team: String,
    // location: String,
    // state: String,
    // city: String,
    // tournament_day: String,
    // address: String,
    // eligibility: {
    //     age: String,
    //     proof: String,
    //     entry: String,
    //     gender: String,
    //     players: {
    //         playing: String,
    //         extra: String,
    //     }
    // }



    name: String,
    type_of_game: String,
    contact: String,
    start_date: String,
    end_date: String,
    total_team_participation: String,
    tournament_day: String,
    location: String,
    state: String,
    city: String,
    address: String
}, { timestamps: true })

const TournamentModel = mongoose.model("tournaments", TournamnetSchema)

module.exports = { TournamentModel }






