const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signUp = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors?.array()[0]?.msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save",
      });
    }

    res.json({
      id: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    });
  });
};

exports.signOut = (req, res) => res.json({ msg: "sign out route" });
