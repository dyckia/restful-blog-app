const express = require("express");
const app = express();
const keys = require("./.configure/keys.js");
const mongoose = require("mongoose");

// mongoose setup
mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

// app config
app.set("view engine", "ejs");

// blog model
const blogSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	content: String,
	dateCreated: {type: Date, default: Date.now}
});

const Blog = mongoose.model("blog", blogSchema);

Blog.create({
	title: "Hello World",
	imgUrl: "https://thehappypuppysite.com/wp-content/uploads/2015/09/The-Siberian-Husky-HP-long.jpg",
	content: "This is the first blogpost.", 
});

// RESTful routes
app.get("/", (req, res) => {
	res.send("hello");
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});