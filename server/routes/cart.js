const express = require("express");
const router = express.Router();

const {auth} = require("../middlewares/auth");
const {addToCart,removeFromCart,getItems} = require("../controllers/cart");


router.put('/cart/addToCart/:productId',auth,addToCart);
router.put('/cart/removeFromCart/:productId', auth, removeFromCart);
router.get('/cart/items',auth, getItems);

module.exports = router;