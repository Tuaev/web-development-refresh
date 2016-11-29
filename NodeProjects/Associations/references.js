var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

var myCallback = function(err, name) {
    if (err) {
        return console.log(err);
    } else {
        return console.log(name);
    }
}

// ==========================================






//User.findOne({email: "bob@bob.com"}).populate("posts").exec(function(err, user){
//    if(err){
//        console.log(err);
//    } else {
//        console.log(user);
//    }
//});


Post.create({
    title: "How to cook the best Burger pt.4",
    content: "Ssdfsdgdghf dsfsd"
},function(err, post){
    User.findOne({email: "bob@bob.com"},function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                myCallback(err, data);
            })
        }
    })
    
})


//User.create({
//    email: "bob@bob.com",
//    name: "Bob Belcher"
//});
//
