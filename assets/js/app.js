// GifTastic
// Written by: Steve Harold
// Created: 12/11/2017
// Last Updated: 12/12/2017

// Function used to turn user input into title case //
function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
  });
}

// On click function for initial and dynamically created buttons
// Populates the #images div with 10 gifs related to the phrase on the button pressed

$("#buttons").on("click", ".button", function() {
  $("#images").empty();
  //set variable storing the data-name of the button you clicked
  var person = $(this).attr("data-name");
  //set variable to giphy api with data-person search
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&rating=r&api_key=dc6zaTOxFJmzC&limit=10";
  //call ajax get method to access giphy api object
  $.ajax({
      url: queryURL,
      method: "GET"
  })
  //when get method finishes
  .done(function(response) {
  //store object in variable
    var results = response.data;
  //iterate through the array 
    for (var i = 0; i < results.length; i++) {
  //create new div with class item for each result
      var gifDiv = $("<div class='col-md-4'>");
  //store rating for each result in variable
      var rating = results[i].rating;
  //create paragraph element to display rating on screen
      var p = $("<p>").text("Rating: " + rating);
  //create img element to show each gif and then set the source
      var personImage = $("<img>");
      personImage.attr("class", "item");
      personImage.attr("data-still", results[i].images.fixed_width_still.url);
      personImage.attr("data-animate", results[i].images.fixed_width.url);
      personImage.attr("data-state", "still");
      personImage.attr("src", results[i].images.fixed_width_still.url);
  // add parapgraphs and imgs to beginning of each newly created div
      gifDiv.prepend(p);
      gifDiv.prepend(personImage);
  // add new divs to #images div
      $("#images").prepend(gifDiv);
    }
  });
});

// On click function for dynamically created GIFs
$("#images").on("click", ".item", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

//On click function for user input submission button
$("#addButton").on("click", function() {
  event.preventDefault();
  if ($("#addPhrase").val().trim() === "") {
    alert("That's not a valid input!");
  } else{
    var phrase = toTitleCase($("#addPhrase").val().trim());
    var newButton = $("<button>" + phrase + "</button>");
    newButton.attr("id", phrase);
    newButton.attr("class","button");
    newButton.attr("data-name", phrase);
    newButton.appendTo("#buttons");
    $("#addPhrase").val("");
  }
});