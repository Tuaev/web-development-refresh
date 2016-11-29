var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo");

var myCallback = function(err, name) {
    if (err) {
        return console.log(err);
    } else {
        return console.log(name);
    }
}

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

//User.findOne({
//    name: "Harry Potter"
//}, function(error, user) {
//    if (error) {
//        console.log(error);
//    } else {
//        user.posts.push({
//            title: "another book",
//            content: "More content!! what!"
//        });
//        user.save(function(err, user) {
//            if (err) {
//                console.log(err);
//            } else {
//                console.log(user);
//            }
//        });
//    }
//});



var newUser = new User({
    email: "harry@poster.edu",
    name: "Harry Potter"
});

newUser.posts.push({
    title: "how to brew",
    content: "Just some content"
});

newUser.save(function(err,user){
    myCallback(err, user);
})
//
//var newPost = new Post({
//    title: "Reflections on apples",
//    content: "They are delicious"
//})
//
//newPost.save(function(error, post){
//    if(error){
//        console.log(error)
//    }else{
//        console.log(post);
//    }
//})