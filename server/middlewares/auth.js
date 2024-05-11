const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next) => {
    
    const _ACCESSCARD = await req.cookies._ACCESSCARD  || req.body.token;

    

    if(!_ACCESSCARD){
        return res.status(400).json({
            success:false,
            message:"session expired"
        })
    }

    try{
        //decode the access_card
        const decode = jwt.verify(_ACCESSCARD, process.env.JWT_SECRET);
        req.user = decode;

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"Something went wrong try logging againg !",
        });
    }
    
    next();
    
}

exports.isSeller = async(req,res, next) => {
    try{
        if(req.user.accountType !== "Seller"){
            return res.status(401).json({
                success:false,
                message:"Only Seller account is allowed to access this route",
            });  
        }
        next();
    }catch(err){
        console.log("")
    }
}

exports.isCustomer = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Customer"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Customer only",
            });  
        }
        next();
    }catch(err){

    }
}


exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only",
            });  
        next();
        }
    }catch(err){

    }
}