const {User} = require("../models/User");
const Item = require("../models/Item");
const Cart = require("../models/Cart");


exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // Get the product
    const product = await Item.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong with Product Id"
      });
    }

    const user = await User.findById(userId);
    const userCart = user.userCart;

    //prepare Cart
    let cart = await Cart.findById(userCart);
    if (!cart) {
      cart = await Cart.create({
        user: user._id,
        items: [productId],
        totalPrice: product.price,
        numberOfItems: 1,
      });

    }else if(cart.items.includes(productId)){
        return res.status(400).json({
          success:false,
          message:"Items alredy added",
        })
      }

    else{
      cart.items.push(productId);
      if(cart.totalPrice < 0){
        cart.totalPrice = 0;
      }
      cart.totalPrice += product.price;

      if(cart.numberOfItems < 0){
        cart.numberOfItems = 0;
      }
      cart.numberOfItems++;
    }
    const updatedCart = await cart.save();


    //update user
    user.userCart = updatedCart._id;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Item Added Successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

  
  exports.removeFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;
  

      const user = await User.findByIdAndUpdate(
        userId, 
        {
          $pull: {
            itemsInCart: productId 
          }
        },
        { new: true }
      );


      const product = await Item.findById(productId);

      const cartId = user.userCart;
      const userCart = await Cart.findByIdAndUpdate(cartId,{
        $pull:{
          items:productId
        },
      },{new:true});

      userCart.numberOfItems--;
      userCart.totalPrice -= product.price;
      await userCart.save();

      console.log(userCart)
      
      return res.status(200).json({
        success: true,
        message: "Item Removed Successfully",
        userCart,
      });

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  
  exports.getItems = async(req,res)=>{
    try{ 
      const id = req.user.id;

      const user = await User.findById({_id:id}).populate("userCart");

      const cartId  = user.userCart;
      
      const items = await Cart.findById(cartId).populate("items");
      console.log("items", items);
      
      return res.status(200).json({
        data:items,
        success:true,
        message:"all items in cart",
      })
    }catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }


  }