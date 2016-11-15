// Check off specific todos by Clicking
$("ul").on("click", "li", function () {
   $(this).toggleClass("completed")
})

// Click on X to fadeOut (delete) todo
$("ul").on("click", "span", function (event) {
   event.stopPropagation();
   $(this).parent().fadeOut(500, function () {
      (this).remove();
   });
});

// Add new task to todo list
$("input[type='text']").keypress(function (event) {
   if (event.which === 13) {
      // grabbing new todo text from input
      var todoTask = $(this).val();
      $(this).val("");
      // create a new li and add to ul
      $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoTask + "</li>");
   }
});

$(".fa-plus").click(function () {

   if ($("input[type='text']").css("display") === "none") {

      $(this).css({
         animationName: "faPlus",
         animationDuration: "0.2s",
         animationTimingFunction: "linear",
         animationDelay: "0",
         animationIterationCount: "1"
      });
   } else {

      $(this).css({

         animationName: "faPlusInverse",
         animationDuration: "0.2s",
         animationTimingFunction: "linear",
         animationDelay: "0",
         animationIterationCount: "1"
      });
   }

   $("input[type='text']").fadeToggle(400);
});