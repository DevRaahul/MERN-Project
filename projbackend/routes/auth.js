const express = require("express");
const { signOut, signUp, signIn, isSignIn } = require("../controllers/auth");
const router = express.Router();
const { check } = require("express-validator");

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

router.post("/signIn", [check("email", "Invalid email").isEmail(), check("password", "Password field is required").isLength({ min: 3 })], signIn);

router.post("/testRoute", isSignIn, (req, res) => {
  res.json({
    message: "test ropute",
  });
});

module.exports = router;
