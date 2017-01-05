var mongo = require('mongodb').MongoClient;
var assert = require('assert');


var url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, (err, db) => {
    assert.equal(null, err, 'Connect refused.');
    var collection = db.collection('parrots');
    collection.count({
        age: {
            $gt: Number(process.argv[2])
        }
    }, (err, data) => {
        assert.equal(null, err, 'Remove failed...');
        console.log(data);
        db.close();
    });
});
