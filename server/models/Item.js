const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:[true, "this field is required"],
        trim:true,
    },

    itemDescription:{
        type:String,
        required:[true, "Item description cannot be empty"],
        trim:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        enum: ["Machine", "Accessory"],
        required:[true, "Please select a category"],
    },
    thumbnail:{
        type:String,
        required:[true, "please upload the image of your item"],
    }

})

const Item = mongoose.model("Item",itemSchema);
module.exports = Item;
