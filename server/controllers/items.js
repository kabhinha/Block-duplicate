const {User} = require("../models/User");
const Item = require("../models/Item");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader")




exports.addItem = async (req, res) => {
    try {

        const { itemName, itemDescription, price, category, thumbnail} = req.body;
        
        if (!itemName || !itemDescription || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }


        // Check if a file was uploaded
        if (!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });
        }

        const userId = req.user.id;

        // Fetch seller details by user ID
        const sellerDetails = await User.findOne({ _id: userId });

        if (!sellerDetails) {
            return res.status(404).json({
                success: false,
                message: "Seller Details not found, No such seller account exists",
            });
        }


        // Upload the thumbnail image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Create the item
        const item = await Item.create({
            itemName,
            itemDescription,
            seller: userId,
            category,
            price,
            thumbnail: thumbnailImage.secure_url || thumbnailImage.url,
        });


        // Push the ID of the item into the seller's items array
        const updatedSeller = await User.findByIdAndUpdate(
            { _id: sellerDetails._id },
            {
                $push: {
                    yourProducts: item._id,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Item created successfully",
            item,
        });

    } catch (err) {
        console.log(`Error in adding items: ${err.message}`);
        return res.status(500).json({
            success: false,
            message: `Error occurred: ${err}`
        });
    }
};


exports.showAllItems = async(req,res) => {
    try{
        
        const machines =  await Item.find({category:"Machine"}).populate("seller").exec();
        const accessory = await Item.find({category:"Accessory"}).populate("seller").exec();


        return res.status(200).json({
            success:true,
            message:"Data for all items fetched Successfully",
            data : [machines, accessory]
        })
        
    }catch(err){
        console.log(`Error while fetching details of all items`);
        return res.status(500).json({
            success:false,
            message:`Error aa gaya ${err.message}`,
        })
    }
}

exports.itemDetail = async(req,res) => {
    try{
        const {itemId} = req.body;
        const itemDetails = await Item.findById({_id:itemId})
                                        .populate("seller")
                                        .populate("category")
                                        .exec();

        if(!itemDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the item with ${itemId}`,
            })
        }
        return res.status(200).json({
            success:true,
            message:"item detail found successfully",
        })

    }catch(err){
        console.log(`Error while fetching details of item`);
        return res.status(500).json({
            success:false,
            message:`Error aa gaya ${err.message}`,
        })
    }
}


exports.removeItem = async(req,res) => {
    try{
        const {itemid} = req.body;
        const data = await Item.findByIdAndDelete({_id:itemid});

            return res.status(200).json({
                success:false,
                message:`Item removed successfully`,
                data
            })



    }catch(err){
        return res.status(400).json({
            success:false,
            message:`error while trying to remove item ${err.message}`
        })
    }
}


exports.getFilteredItem = async(req,res) => {
    try{
        const {category} = req.params;
        if(!category){
            return res.status(400).json({
                success:false,
                message:`No Category exist`
            })
        }


        //search for Data in DB
        let items;
        if(category == "Shop All" || category == "Sale"){
            items = await Item.find({});
        }
        else{       
            items = await Item.find({category:category})
        }

        return res.status(200).json({
            success:true,
            message:`data fetched successfully`,
            items
        })
        
    }catch(err){
        return res.status(400).json({
            success:false,
            message:`Check your network connection${err.message}`,
        })
    }
}

exports.getItemDetails = async(req,res) => {
    try{
        const {productId} = req.params;

        const product = await Item.findById(productId);


        return res.status(200).json({
            success:true,
            product,
        })

    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}