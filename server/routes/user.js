const express = require("express");
const router = express.Router();


const {createProfile,deleteAccount} = require("../controllers/user");
const {auth, isAdmin, isCustomer} = require("../middlewares/auth");

router.post('/profile', auth, createProfile);
router.delete('/deleteAccount', auth, deleteAccount);

module.exports = router;