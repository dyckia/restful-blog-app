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

// RESTful routes
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});