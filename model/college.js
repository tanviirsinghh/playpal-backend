const { mongoose } = require("mongoose");

const CollegeSchema = mongoose.Schema({
    college: String,
    course_id: {
        type: String,
        ref: "courses"
    },
    img: String,
    status: String

}, { timestamps: true })

const CollegeModel = mongoose.model("colleges", CollegeSchema);

module.exports = { CollegeModel };