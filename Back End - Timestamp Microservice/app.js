var express = require('express');
var mongoClient = require('mongodb').MongoClient;

var app = express();
var port = 3000;
// Configuration


// Middlewares


// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Listening... port: ' + port);
});
