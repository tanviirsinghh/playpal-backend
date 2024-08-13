const { mongoose } = require("mongoose");


    const oAuthSchema = mongoose.Schema({
        username:String,
        email:String,
        family_name:String,
        given_name:String,
        id:Number,

    
    },{ timestamps: true })

const oAuthModel = mongoose.model("oAuth", oAuthSchema)

module.exports = oAuthModel;

