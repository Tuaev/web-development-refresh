var bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();


// ================= APP CONFIG =================
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));



// ================= MONGOOSE/MODEL CONFIG =================
var blogSchema = new mongoose.Schema({
    title: String,
    shortIntro: String,
    image: {
        type: String,
        default: "http://www.completecarewellnesscenter.com/wp-content/uploads/2016/09/blog_default.png"
    },
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);

// ================= RESTFUL ROUTES =================
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
    Blog.find({}, function(error, blogs) {
        if (error) {
            console.log(error);
        } else {
            res.render("index", {
                blogs: blogs
            });
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    // create blog   
    req.body.blog.title = req.sanitize(req.body.blog.title);

    if (req.body.blog.image === "") {
        req.body.blog.image = "http://www.completecarewellnesscenter.com/wp-content/uploads/2016/09/blog_default.png"
    }

    Blog.create(req.body.blog, function(error, newBlog) {
        if (error) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.render("show", {
                blog: foundBlog
            });
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(error, foundBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {
                blog: foundBlog
            });
        }
    })
})

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    req.body.blog.title = req.sanitize(req.body.blog.title);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, updatedBlog) {
        if (error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(error) {
        if (error) {
            console.log(error);
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs")
        }
    })
})


// ================= Listener =================
app.listen(3000, function() {
    console.log("Blog has started")
});