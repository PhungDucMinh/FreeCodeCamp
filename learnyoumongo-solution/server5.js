var mongo = require('mongodb').MongoClient;
var assert = require('assert');

console.log('heloo');

var url = 'mongodb://localhost:27017/learnyoumongo';
var firstname = process.argv[2];
var lastname = process.argv[3];
console.log('firstname: ' + firstname + '\n' + 'lastname: ' + lastname);

mongo.connect(url, (err, db) => {
    assert.equal(null, err, 'Connect refused.');
    var collection = db.collection('docs');
    console.log('Begin insert');
    console.log('firstname: ' + firstname + '\n' + 'lastname: ' + lastname);
    var obj = JSON.stringify({
        firstname: firstname,
        lastname: lastname
    });
    collection.insert(obj, (err, data) => {
        console.log('Inserted data');
        assert.equal(null, err, 'Insert failed...');
        console.log(JSON.stringify(obj));
        db.close();
    });
});
