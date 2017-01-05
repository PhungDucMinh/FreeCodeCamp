 
var express = require('express')
var app = express();
app.use(express.static("D:\\FreeCodeCamp\\learnexpressjs\\index.html"));
app.listen(1337);