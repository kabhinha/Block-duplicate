const mailSender = require("../utils/mailSender");
const Token = require("../models/Token");
const { User, validate } = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");

exports.SignUp = async (req, res) => {
    try {
      const {firstName, lastName, email, password, confirmPassword, accountType} = req.body;
      
      if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType){
        return res.status(500).json({
            success:false,
            message:"All fields are required",
        })
      }

      if(password != confirmPassword){
        return res.status(500).json({
            success:false,
            message:"passwords do not match",
        })
        }

        const  {error}  =  validate(req.body);
        if (error){
          return res.status(400).send(error.details[0].message);
        }
      
    
      let user = await User.findOne({ email: email });
      if (user){
        return res.status(500).json({
            success:false,
            message:"User with given email already exist!",
        })
      }
      
      //hash the password
      const hashedPassword = await bcrypt.hash(password,10);
      
      const ProfileDetails = await Profile.create({
        gender:null, //initially null because these details are optional
        DOB:null,
        about:null,
        MoNumber:null,
        });

      user = await new User({
          firstName:firstName,
          lastName:lastName,
          email:email,
          accountType:accountType,
          additionalDetails:ProfileDetails._id,
          password:hashedPassword,
      }).save();
  
      
      let token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
          expiresIn: 10*24*60*60
      }).save();
      
  
      const message = `Click the on the given link to verify your ${accountType} account ${process.env.API_BASE}/user/verify/${user.id}/${token.token}`;
      await mailSender(email, "Verification email from E-commerce app", message);
      
      return res.status(200).json({
        success:true,
        message:`A Email sent to ${email}, please verify`,
      })
    } 
    
    catch (error) {
      res.status(400).send(`An error occured ${error.message}`);
    }
    
};



exports.VerifyUser = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.params.id });
        if (!user){
            return res.status(400).send("Link expired! SignUp again");
        }
      
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
          
       
        if (!token){
            await User.findByIdAndRemove({_id:user._id});
            return res.status(400).send("Token is Expired! SignUp again");
        }
        
        
        await User.findByIdAndUpdate({ _id: user._id}, {verified: true}, {new:true});
        await Token.findByIdAndRemove(token._id);
        
        res.send(`email verified sucessfully you can Now login  ${process.env.API_BASE}/login`);
        
    }catch (error) {
      res.status(400).send(`An error occured ${error.message}`);
    }
  
}



exports.Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Check if the user exists or not
      let existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(400).json({
          success: false,
          message: "User does not exist! Sign Up Now",
        });
      }
  
      // Verify the password
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
  
      if (passwordMatch) {
        // Check if the user is verified or not
        const { verified } = existingUser;
        if (!verified) {
          return res.status(400).json({
            success: false,
            message: "Verify your email before login",
          });
        }
  
        const payload = {
          email: existingUser.email,
          id: existingUser._id,
          accountType: existingUser.accountType,
        };
  
        let token =  jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
  
        // Create options for the cookie
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
          domain: "localhost"          
        };
  
        // Creation of the cookie and response
          res.cookie("_ACCESSCARD", token, options).status(200).json({
          success: true,
          token,
          existingUser: { ...existingUser._doc, password: undefined },
          message: "User logged in successfully",
        });
          
        return;
      }
  
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Failed to login => ${err.message}`,
      });
    }
  };
  
