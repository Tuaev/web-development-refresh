var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var pickedColor = pickColor();
var h1 = document.querySelector("h1");

colorDisplay.textContent = pickedColor;


for (var i = 0; i < squares.length; i++) {
   //adding initial colors to squares
   squares[i].style.background = colors[i];

   //adding click listeners to squares
   squares[i].addEventListener("click", function () {
      //grabbing color of clicked square
      var clickedColor = this.style.background;

      //comparing color to pickedColor
      if (clickedColor === pickedColor) {
         messageDisplay.textContent = "Correct";
         changeColors(clickedColor);
         h1.style.background = clickedColor;
      } else {
         this.style.background = "#232323";
         messageDisplay.textContent = "Try Again";
      }
   });
}

function changeColors(color) {
   //loop through all squares
   for (var i = 0; i < squares.length; i++) {
      squares[i].style.background = color;
   }
}

function pickColor() {
   var random = Math.floor(Math.random() * colors.length);
   return colors[random];
}

function generateRandomColors(num) {
   //make array that holds random RGB colors
   var arr = []

   for (var i = 0; i < num; i++) {
      //generate random color and push into array
      arr.push(randomColor());
   }
   
   return arr;
}

function randomColor() {
   //pick "red" from 0 - 255
   var r = Math.floor(Math.random() * 256)
      //pick "green" from 0 - 255
   var g = Math.floor(Math.random() * 256)
      //pick "blue" from 0 - 255
   var b = Math.floor(Math.random() * 256)
   
   return "rgb(" + r + ", " + g + ", " + b + ")";
}
