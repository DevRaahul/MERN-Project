const express = require("express");
const { signOut, signUp } = require("../controllers/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/signOut", signOut);
router.post(
  "/signUp",
  [
    check("name", "Name should be atleast 3 char").isLength({ min: 3 }),
    check("email", "Invalid email").isEmail(),
    check("password", "Password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signUp
);
module.exports = router;
