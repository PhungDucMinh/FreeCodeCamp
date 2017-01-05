var url = "http://www.stands4.com/services/v2/quotes.php?uid=5474&tokenid=12gh4fiTaCbz0Zyr&searchtype=random";

var quote;
var template = "<blockquote class='blockquote'><p>{{{quote}}}</p><footer class='blockquote-footer'>{{{author}}}</footer></blockquote>";
$(document).ready(function () {
    $("#get-next-quote").on("click", nextQuote);
    //update next quote
    nextQuote();
});


function animation() {
    var color = createRandomColor();
    var animationTime = 2000;
    //body backgroundColor
    $(".background-color-default").animate({
        backgroundColor: [color, "swing"]
    }, animationTime);

    $(".btn-default").animate({
        backgroundColor: [color, "swing"]
    }, animationTime);

    $(".color-default").animate({
        color: [color, "swing"]
    }, animationTime);
}

function createRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

// Get new quote
function nextQuote() {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "xml",
    })
        .done(function (respone) {
            console.log(respone);
            $("blockquote").fadeOut(2000);
            var quote = extractQuote(respone);
            var tweet = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + quote["quote"] + quote["author"];
            $("#tweet-quote").attr("href", tweet);
            
            displayQuote(quote);
            animation();
        })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, There are a problem.");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.log("Request: " + xhr);
        })
        .always(function (xhr, status) {
            console.log("The request is complete.");
        });
}

function changeTweet(){

}

// Display quote 
function displayQuote(quote) {
    // var template = $("#quote-container").html();
    Mustache.parse(template);
    var renderedTemplate = Mustache.render(template, quote);
    $("#quote").html(renderedTemplate);
}

// Extract quote from respone string
function extractQuote(respone) {
    var quoteValue = respone.getElementsByTagName("quote")[0].innerHTML;
    var quoteAuthor = respone.getElementsByTagName("author")[0].innerHTML;

    var result = {
        author: quoteAuthor,
        quote: quoteValue
    };

    return result;
}