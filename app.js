// requiring
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

//confiuration =============
require("dotenv").config();
//initializing APP =============
const app = express();
PORT = 5000;
// some setting-ups=======
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.set("trust proxy", true);
//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(function (req, res, next) {
  req.getUrl = function () {
    return req.protocol + "://" + req.get("host");
    //   + req.originalUrl    -->full url
  };
  return next();
});

app.get("/", (req, res) => {
  console.log(req.query);
  let place = req.query.place;
  let name = req.query.name;
  let time = req.query.time;
  let reason = req.query.reason;
  console.log(place, name, time, reason);
  console.log(req.getUrl());
  return res.render("index.ejs", {
    data: { name: name, place: place, time: time, reason: reason },
  });
});
app.listen(PORT, () => {
  console.log("APP is running on PORT:", PORT);
});
