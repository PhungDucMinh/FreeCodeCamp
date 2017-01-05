// http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1
/*
var categories = ["inspire", "management", "sports", "life", "funny", "love", "art", "students"];
var url = "http://quotes.rest/qod.json?category=inspire";
*/
var designQuoteAPIURL = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";

var url = "http://www.stands4.com/services/v2/quotes.php?uid=5474&tokenid=12gh4fiTaCbz0Zyr&searchtype=random";
var request = new XMLHttpRequest();

$(document).ready(function () {
  //Make call on load
  request.open('GET', url, true);
  request.send();
});

request.onerror = function () {
  console.log("XMLHttpRequest Error");
};


request.onload = function () {
  console.log(request.responseText);
  displayQuote(request.responseText);
};



function displayQuote(quote) {
  var quoteContainer = document.getElementById("quoteContainer");
  quoteContainer.innerHTML = quote;
}
