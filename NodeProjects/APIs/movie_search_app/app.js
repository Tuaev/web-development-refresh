var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
   var search = req.query.search
   var url = "http://www.omdbapi.com/?s=" + search
   request(url, function(error, response, body){
      if(!error && response.statusCode == 200){
         var parsedData = JSON.parse(body);
         res.render("results", {data: parsedData});
      }
   });
});

app.get("*", function(req, res){
   res.send("Nothing Found");
});


app.listen(3000, function(){
   console.log("Node/Server Started!");
});