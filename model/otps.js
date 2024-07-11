const { mongoose } = require('mongoose')
const OTPSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    otp: String,
    comment: {
        type: String
    },
    expiredate:{
        type: Date
    }
},{
    timestamps:true
}
)

const OTPModel = mongoose.model('otps', OTPSchema);

module.exports=OTPModel;
