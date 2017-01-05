var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/learnyoumongo';
mongo.connect(url, (err, db) => {
    if (err) {
        return err;
    }
    var collection = db.collection('parrots');
    collection.find({age: {$gt: Number(process.argv[2])}}
    ).toArray((err, documents) =>{
        test.equal(null, err);
        console.log(documents);
        db.close();
    });
    return null;
});

