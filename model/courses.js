const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    name: String,
    img: String,
    status: String,
    goal_id: {
        type: String,
        ref: "goals"
    }
}, { timestapms: true })

const CoursesModel = mongoose.model('courses', CourseSchema)

module.exports = { CoursesModel }