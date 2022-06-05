const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const SECRET = process.env.SECRET;

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

exports.signIn = (req, res) => {
  const { email, password } = req?.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors?.array()[0]?.msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Unable to find user details",
      });
    }
    if (!user) {
      return res.status(400).json({
        error: "User email not found",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password does not match",
      });
    }

    const token = jwt.sign({ _id: user?.id }, process.env.SECRET);
    //add token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to client
    const { _id, name, email, role } = user;
    res.json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
    });
  });
};

exports.signOut = (req, res) => {
  res.clearCokkie("token");
  return res.json({ msg: "User log out successfully." });
};

// protected routes
exports.isSignIn = expressJwt({
  secret: SECRET || "shhhh",
  userProperty: "auth",
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req?.profile && req?.auth && req.profile?._id === req?.auth?._id;

  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req?.profile?.role === 0)
    return res.status(403).json({
      error: "Access Denied: Admin Route",
    });

  next();
};
