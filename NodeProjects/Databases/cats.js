var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
})

var Cat = mongoose.model("Cat", catSchema);

//// adding new cat to database
//var george = new Cat({
//   name: "Jack",
//   age: 7,
//   temperament: "Chill"
//});
//
//george.save(function(error, cat){
//   if (error) {
//    console.log(error);
//  } else {
//    console.log('Cat added');
//    console.log(cat);
//  }
//});

Cat.create({
   name: "Snowie",
   age: 15,
   temperament: "Bland"
}, function (error, cats) {
   if (error) {
      console.log("Error!");
      console.log(error);
   } else {
      console.log('Added new Cat');
      console.log(cats);
   }
});

// retrieve all cats from the DB
Cat.find({}, function (error, cats) {
   if (error) {
      console.log("Error!");
      console.log(error);
   } else {
      console.log('All the Cats...');
      console.log(cats);
   }
})