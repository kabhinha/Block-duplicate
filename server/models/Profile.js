const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    DOB:{
        type:Date,
    },
    MoNumber:{
        type:Number,
        trim:true,
    },
    about:{
        type:String,
        trim:true,
    },
    gender:{
        type:String,
    }
})

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;