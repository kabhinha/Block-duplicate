const mongoose = require("mongoose");

const Cartschmea = new mongoose.Schema({

    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
    }],
    numberOfItems:{
        type:Number,
        default:0,
    },
    totalPrice:{
        type:Number,
        default:0,
    }

});

const Cart = mongoose.model("Cart", Cartschmea);
module.exports = Cart;