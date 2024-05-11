const express = require("express");
const router = express.Router();

const {Login,VerifyUser, SignUp} = require("../controllers/auth");
const {auth, isAdmin, isCustomer} = require("../middlewares/auth");


router.post('/signup', SignUp);
router.post('/login', Login);
router.get("/user/verify/:id/:token", VerifyUser);

router.get("/logout", auth, (req, res) => {
    return res
      .clearCookie("_ACCESSCARD")
      .status(200)
      .json({ message: "Successfully logged out 😏 " });
  });
  

module.exports = router;