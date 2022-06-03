const express = require("express");
const { signOut } = require("../controllers/auth");
const router = express.Router();

router.get("/signOut", signOut);

module.exports = router;
