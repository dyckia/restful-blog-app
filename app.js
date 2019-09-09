const express = require("express");
const app = express();
const keys = require("./.configure/keys.js");
const mongoose = require("mongoose");

mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});