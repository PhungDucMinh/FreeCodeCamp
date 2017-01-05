var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var dbname = process.argv[2];
var url = 'mongodb://localhost:27017/' + dbname;
console.log('dbname: ' + dbname);

mongo.connect(url, (err, db) => {
    assert.equal(null, err, 'Connect refused.');
    var collection = db.collection('users');
    console.log('Begin update');
    collection.update({
      username: 'tinatime'
    }, {
        $set:
        {age: 40}
    }, (err, data) => {
        console.log('Inserted data');
        assert.equal(null, err, 'Insert failed...');
        console.log(JSON.stringify(data));
        db.close();
    });
});
