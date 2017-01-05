var mongo = require('mongodb').MongoClient;
var assert = require('assert');


var url = 'mongodb://localhost:27017/learnyoumongo';
var size = process.argv[2];



mongo.connect(url, (err, db) => {
    //console.log(size);
    assert.equal(null, err, 'Connect refused.');
    var collection = db.collection('prices');
    collection.aggregate([{$match: {size: size}},
    {
        $group: {
            _id: 'average',
            average: {$avg: '$price'}
        }
    }])
    .toArray((err, data) => {
        assert.equal(null, err);
        console.log(data[0].average.toFixed(2));
        db.close();
    });
});
