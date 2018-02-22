// ========================================= variables =========================================== //

// Initial array of topics that consist of animals
var topics = ["Dog", "Cat", "Horse", "Goat", "Pig",
    "Bear", "Wolf", "Llama", "Alpaca", "Lion",
    "Lamb", "Deer", "Mouse", "Hamster", "Elk", "Boar",
    "Rabbit", "Hedgehog", "Chicken", "Gerbil", "Guinea pig"];

var imgObj = "";
var gifImgDiv = "";
var imgUrl = "";
var imgEl = "";
var gifRating = "";
var gifRatingEl = "";
var animalBtn = "";
var newAnimalBtn = "";

// ========================================= functions =========================================== //

// this function displays images returned by the giphy api within the gifs-area container.
function displayAnimalInfo() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JFS5KLg5QUzBC4ShypYYTP4iKfnVmHjl&q="
        + animal + "&limit=10&offset=0&rating=PG&lang=en";
    // calls the giphy api for the clicked animal.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // empty the gifs-area before presenting new images. 
        $(".gifs-area").empty();
        // build a container for each gif & show each gif image within the gifs-area.
        for (var k = 0; k < response.data.length; k++) {
            // store an occurrence of a gif json object in a variable
            imgObj = response.data[k];
            // store a gif-image container string
            gifImgDiv = $("<div class='gif-img-area text-center float-left m-1'>");
            // build the src url strings using data from the api json object.
            imgUrl = imgObj.images.fixed_height_still.url;
            imgGif = imgObj.images.fixed_height.url;
            // Create an image element
            imgEl = $("<img>").attr("src", imgUrl);
            imgEl.addClass("animal-img");
            imgEl.attr("width", imgObj.images.fixed_height_still.width);
            imgEl.attr("height", imgObj.images.fixed_height_still.height);
            imgEl.attr("data-img", imgUrl);
            imgEl.attr("data-gif", imgGif);
            // Append the image to the gif-image container.
            gifImgDiv.append(imgEl);
            // Store the gif MPAA rating
            gifRating = imgObj.rating;
            // store a gif MPAA rating paragraph element.
            gifRatingEl = $("<p>").text("MPAA Rating: " + gifRating.toUpperCase());
            // Append the gif rating to the gif-image container.
            gifImgDiv.append(gifRatingEl);
            // Append the image and rating to the gifs-area container.
            $(".gifs-area").append(gifImgDiv);
        }
        // when the gif-image is clicked show either the gif animation or return to the still image.
        $(document).on("click", ".animal-img", function (event) {
            // store the links to the gif and image for the button that was clicked.   
            var srcUrl = $(this).attr("data-gif");
            var srcImg = $(this).attr("data-img");
            // if button's src is the image - set the src to the gif.
            if ($(this).attr("src") === srcImg) {
                $(this).attr("src", srcUrl);
            }
            // if button's src is the gif - set the src to the image.
            else if ($(this).attr("src") == srcUrl) {
                $(this).attr("src", srcImg);
            };
        });
        // add onclicks to all of the animal buttons.
        $(document).on("click", ".animal-btn", displayAnimalInfo);
    });
}

// dynamically build buttons for each occurrence within the topics array.
function buildButtons() {
    $(".buttons-area").empty();
    for (var i = 0; i < topics.length; i++) {
        animalBtn = $("<button>");
        animalBtn.addClass("animal-btn");
        animalBtn.addClass("btn");
        animalBtn.addClass("btn-secondary");
        animalBtn.addClass("m-1");
        animalBtn.attr("data-name", topics[i]);
        animalBtn.text(topics[i]);
        $(".buttons-area").append(animalBtn);
    }
    // add onclicks to all of the animal buttons.
    $(document).on("click", ".animal-btn", displayAnimalInfo);
}

// This function adds new animals to the topics array when the submit button is clicked.
$("#add-animal-button").on("click", function (event) {
    // event.preventDefault() prevents the submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();
    // store user's input text in a new animal button variable.
    newAnimalBtn = $("#animal-input").val().trim();
    // if input text is spaces send error alert.
    if (newAnimalBtn === "") {
        alert("No animal name was specified within the text box." +
            "\nPlease enter an animal name in the text box to add an animal.");
    }
    else {
        // since input text is stored in newAnimalBtn, empty the user's text input.
        $("#animal-input").val("");
        // add user new animal input to the topics array.
        topics.push(newAnimalBtn);
        // dynamically build buttons for each occurrence within the topics array. 
        buildButtons();
        // add onclicks to all of the animal buttons. 
        $(document).on("click", ".animal-btn", displayAnimalInfo);
    }
});

// ========================================= main process ========================================= //
buildButtons();
