var numSquares = 6;
var colors = generateRandomColors(numSquares);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var pickedColor = pickColor();
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset")
var easyBtn = document.querySelector("#easyBtn")
var hardBtn = document.querySelector("#hardBtn")


newColorGame();

easyBtn.addEventListener("click", function () {
   messageDisplay.textContent = "";
   hardBtn.classList.remove("selected");
   easyBtn.classList.add("selected");
   numSquares = 3;
   colors = generateRandomColors(numSquares);
   pickedColor = pickColor();
   colorDisplay.textContent = pickedColor;
   for (var i = 0; i < squares.length; i++) {
      if (colors[i]) {
         squares[i].style.background = colors[i];
      } else {
         squares[i].style.display = "none";
      }
   }
})

hardBtn.addEventListener("click", function () {
   messageDisplay.textContent = "";
   easyBtn.classList.remove("selected");
   hardBtn.classList.add("selected");
   numSquares = 6;
   colors = generateRandomColors(numSquares);
   pickedColor = pickColor();
   colorDisplay.textContent = pickedColor;
   for (var i = 0; i < squares.length; i++) {

      squares[i].style.background = colors[i];
      squares[i].style.display = "block";
   }
})



resetButton.addEventListener("click", function () {
   messageDisplay.textContent = "";
   resetButton.textContent = "New Game"
      //generate all new colors
   colors = generateRandomColors(numSquares);
   //pick a new random color from array
   pickedColor = pickColor();
   //change colorDisplay to match pickedColor
   colorDisplay.textContent = pickedColor;
   //change colors of squares
   newColorGame();
   //reset header
   h1.style.background = "steelblue";
})

colorDisplay.textContent = pickedColor;

function newColorGame() {
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
            resetButton.textContent = "Play Again?"
            changeColors(clickedColor);
            h1.style.background = clickedColor;
         } else {
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
         }
      });
   }
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