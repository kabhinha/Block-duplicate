const mongoose = require("mongoose");
const Joi = require("joi");

const userSchmea = new mongoose.Schema({
    firstName:{
        type:String,
        require:[true, "please enter your first name"],
        trim:true
    },
    lastName:{
        type:String,
        require:[true, "please enter your last name"],
        trim:true
    },
    email:{
        type:String,
        require:[true, "please enter your email"],
        trim:true
    },
    password:{
        type:String,
        require:[true, "create your password"],
        trim:true
    },
    accountType:{
        type:String,
        enum:["Admin", "Customer", "Seller"],
        required:true,
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    yourProducts:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Item"
    }],
    
    userCart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    image: {
        type:String,  //image url string type ka hi hoga
        // required:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    token:{
        type:String,
    },

});

const User = mongoose.model("User", userSchmea);

const validate = (user) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8).label("password"),
        firstName: Joi.string().required().max(15),
        lastName: Joi.string().required().max(10),
        accountType: Joi.string().required(10),
        confirmPassword: Joi.string().required().min(8).label("confirmPassword"),
    });
        return schema.validate(user);
    };
    
    
    module.exports = {
        User,
        validate
    }