const Category = require("../models/Category");

exports.createCategory = async (req,res) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
                return res.status(401).json({
                    success:false,
                    message:"All fields are required",
                })
        }

        //create entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"Category created Successfully"
        });

    }catch(err){
        return res.status(401).json({
            success:false,
            message:err.message,
        });
    }
};


exports.showAllCategory = async(req,res) => {
    try{ 
        //make sure name and description should be there
        const allCategory = await Category.find({}, {name:true, description:true});

        return res.status(200).json({
            success:true,
            message:"All categories fetched Successfully",
            allCategory: allCategory,
        });

    }catch(err){
         return res.status(401).json({
            success:false,
            message:err.message,
        })
    }
}
