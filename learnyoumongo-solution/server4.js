var mongo = require('mongodb').MongoClient;
var test = require('assert');

var url = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(url, (err, db) => {
    test.equal(null, err, 'Connect error...');
    var collection = db.collection('parrots');
    collection.find(
        {age: {$gt: Number(process.argv[2])}}
        , {name: 1, age: 1, _id: 0}
    ).toArray((err, documents) =>{
        test.equal(null, err, 'Find error...');
        console.log(documents);
        db.close();
    });
    return null;
});

