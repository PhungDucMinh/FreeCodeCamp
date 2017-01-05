var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var dbname = process.argv[2];
var url = 'mongodb://localhost:27017/' + dbname;
console.log('dbname: ' + dbname);

var collectionName = process.argv[3];
var _id = process.argv[4];

mongo.connect(url, (err, db) => {
    assert.equal(null, err, 'Connect refused.');
    var collection = db.collection(collectionName);
    collection.remove({
      _id: _id
    }, (err, data) => {
        assert.equal(null, err, 'Remove failed...');
        console.log(data);
        db.close();
    });
});
