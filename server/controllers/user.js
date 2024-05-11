const {User} = require("../models/User");
const Profile = require("../models/Profile");


exports.createProfile = async (req,res) => {
    try{

        const image = req.file;
        const {DOB,MoNumber,about,gender} = req.body;


        const userId = req.user.id;
        const user = await User.findById({_id:userId});

        //Update Profile
        const ProfileId = user.additionalDetails;
        const profile = await Profile.findByIdAndUpdate({_id:ProfileId},{
            DOB:DOB,
            MoNumber:MoNumber,
            about:about,
            gender:gender,
        })
        
   
        //update user
        user.additionalDetails = ProfileId;
        await user.save();
        
        
        return res.status(200).json({
            succss:true,
            message:"Profile updated successfully",
        })

    }catch(err){
        return res.status(400).json({
            succss:false,
            message:`failed to updated Profile, ${err.message}`,
        })
    }
}

exports.deleteAccount = async (req,res) => {
    try{
        //get id
        const id = req.user.id;
        //validation
        const user= await User.findById({_id:id});

        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        await User.findByIdAndDelete({_id:id});

        return res.clearCookie("_ACCESSCARD").status(200).json({
            success:true,
            message:"User deleted successfully",
        })

    }catch(err){
            return res.status(400).json({
                success:false,
                message:"failed to Delete account",
                error : err.message,
            })
    }
}