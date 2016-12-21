var express = require('express')
  , router = express.Router()

var dbUrl = 'mongodb://localhost:27017/urls';
var collectionName = "test";
var mongo = require('mongodb').MongoClient

function loadUrl(db, url, callback) {
    var collection = db.collection(collectionName)
      collection.find({
        url: url
      }).toArray(function(err, urls) {
        if (err) throw err
        callback(urls);
    })
}

router.get('/new/:url', function (req, res) {
    var url = req.params.url;
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        loadUrl(db, url, function(urls) {
            var obj = {
                url: url
            };
            if ( urls.length>0 ) {
                obj.id = urls[0]._id;
                obj.msg = "Already existing.";
                res.send(obj);
                return false;
            }
            
            var collection = db.collection(collectionName)
            collection.insert(obj, function(err, data) {
                if (err) throw err
                obj.id= data.ops[0]._id;
                db.close()
                res.send(obj);
            })
        });
    });
});
router.get('/get', function (req, res) {
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        
        var collection = db.collection(collectionName)
          collection.find().toArray(function(err, urls) {
            if (err) throw err
            res.send(urls);
        })
    });
});
router.get('/', function (req, res) {
    res.render('shorturl', {base: req.baseUrl});
});
    
module.exports = router;