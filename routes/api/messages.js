var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_HOST;

const client = new MongoClient(uri,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

router.get('/', function(req, res, next) {
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("messages").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.text);
            db.close();
            res.json(result);
        });
      });
});

router.post('/', function(req, res, next) {
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var message = { text: req.body.text};
        dbo.collection("messages").insertOne(message, function(err, result) {
            if (err) throw err;
            res.json(result.insertedCount)
            db.close();
        });
    });
});
    
module.exports = router;
