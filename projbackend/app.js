const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/auth");
require("dotenv").config();

//middleware functions
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//Port
const port = process.env.PORT;

// Using middleware functions
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);

// Database connectivity
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(console.log("DB not connected"));

// server started
app.listen(port, () => {
  console.log(`App running at port: ${port}`);
});
