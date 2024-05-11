const express = require("express");
const router = express.Router();

const multer = require('multer');


const {auth, isSeller, isCustomer} = require("../middlewares/auth")
const {addItem, showAllItems, getFilteredItem, getItemDetails} = require("../controllers/items");


router.post('/addProduct',  auth, isSeller, addItem);
router.get('/showItems',auth, isSeller, showAllItems);
router.get(`/items`, auth, isSeller, getFilteredItem);



router.get('/Items/:category', auth, getFilteredItem);
router.get('/productDetails/:productId', auth, getItemDetails);

module.exports = router;