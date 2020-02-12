var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('mongodb://ap:ap@db1-shard-00-00-8zsnn.mongodb.net:27017,db1-shard-00-01-8zsnn.mongodb.net:27017,db1-shard-00-02-8zsnn.mongodb.net:27017/test?ssl=true&replicaSet=DB1-shard-0&authSource=admin&retryWrites=true&w=majority', ['posts'])
/* GET users listing. */
router.get('/', function(req, res, next) {
    db.posts.find(function(err, data) {
        res.json(data);
    });
//   res.send('respond with a resource');
});

module.exports = router;
