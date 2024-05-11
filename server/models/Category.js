const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
    },
    item:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
    }]
})

module.exports = mongoose.model("Category", categorySchema);