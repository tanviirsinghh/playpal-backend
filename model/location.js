const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
    location: String
})

const LocationModel = mongoose.model("locations", LocationSchema)
module.exports = { LocationModel }