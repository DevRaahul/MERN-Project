const express = require("express");
const port = 8000;

const app = express();
const admin = (req, res) => {
  return res.send("This is Admin Page");
};

const isAdmin = (req, res, next) => {
  if (!true) next();
};

const isLoggedIn = (req, res, next) => {
  if (!true) next();
};

app.get("/admin", isLoggedIn, isAdmin, admin);

app.get("/testExpress", (req, res) => res.send("hello ExpressJs"));
app.get("/login", (req, res) => res.send("login ExpressJs"));
app.get("/sigIn", (req, res) => res.send("sigIn ExpressJs"));

app.listen(port, () => console.log("App listening on port 8000"));
