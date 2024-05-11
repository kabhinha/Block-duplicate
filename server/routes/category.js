const express = require("express");
const router = express.Router();

const {auth, isAdmin} = require("../middlewares/auth");
const {showAllCategory, createCategory} = require("../controllers/category");


router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/allCategory", auth, isAdmin, showAllCategory);