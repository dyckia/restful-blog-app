const express = require("express");
const app = express();
const keys = require("./.configure/keys.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

// mongoose setup
mongoose.connect(keys.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

// app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// blog model
const blogSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	content: String,
	dateCreated: {type: Date, default: Date.now}
});

const Blog = mongoose.model("blog", blogSchema);

// RESTful routes
// root route
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

// INDEX route
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// CREATE route
app.post("/blogs", (req, res) => {
	req.body.blog.content = req.sanitize(req.body.blog.content);
    Blog.create(req.body.blog, (err, blog) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

// NEW route
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// SHOW route
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			console.log(err);
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT route
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if (err) {
			console.log(err);
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE route
app.put("/blogs/:id", (req, res) => {
	req.body.blog.content = req.sanitize(req.body.blog.content);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

// DELETE route
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, () => {
	console.log("server is listening on port 3000");
});