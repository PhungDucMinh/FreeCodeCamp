var url = "http://www.stands4.com/services/v2/quotes.php?uid=5474&tokenid=12gh4fiTaCbz0Zyr&searchtype=random";

var quote;
var template = "<blockquote class='blockquote'><p>{{{quote}}}</p><footer class='blockquote-footer'>{{{author}}}</footer></blockquote>";
$(document).ready(function () {
    $("#get-new-quote").on("click", getNewQuote);
    $("#btn-animation").on("click", animation);
});


function animation() {
    var color = createRandomColor();
    $("animation-effect").animate({
        color: "#2345AC"
    }, 200);
    $("body").animate({
        backgroundColor: [color, "swing"]
    }, 2000);
}

function createRandomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}

// Get new quote
function getNewQuote() {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "xml",
    })
        .done(function (respone) {
            console.log(respone);
            displayQuote(extractQuote(respone));
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

// Display quote 
function displayQuote(quote) {
    // var template = $("#quote-container").html();
    Mustache.parse(template);
    var renderedTemplate = Mustache.render(template, quote);
    $("#quote-container").html(renderedTemplate);
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