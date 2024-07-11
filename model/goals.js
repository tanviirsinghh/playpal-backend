const mongoose = require("mongoose")

const GoalsSchema = mongoose.Schema({
    name: String,
    status: String,
    img: String,
    course: Array

}, { timestamps: true })

const GoalsModel = mongoose.model("goals", GoalsSchema)

module.exports = { GoalsModel };
