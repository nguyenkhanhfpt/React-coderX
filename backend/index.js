require('dotenv').config();

const express = require("express");
const cors = require("cors"); 
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/coderX");

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// require router
const adminRouter = require("./routers/admin.router");
const apiRouter = require("./routers/api.router");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

// use Router
app.use("/admin", adminRouter);
app.use("/api", cors(corsOptions), apiRouter);

app.listen(port, console.log(`App is running in port ${port}`));
