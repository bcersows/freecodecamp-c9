var express = require('express')
  , router = express.Router()

var dbUrl = 'mongodb://localhost:27017/urls';
var collectionName = "test";
var mongo = require('mongodb').MongoClient

function loadUrl(db, url, id, callback) {
    var collection = db.collection(collectionName)
        var find = {};
        if ( url ) { find.url = url; }
        if ( id ) { find._id = id; }
        collection.find(find).toArray(function(err, urls) {
            if (err) throw err
            callback(urls);
    })
}

router.get('/new/:url', function (req, res) {
    var url = req.params.url;
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        loadUrl(db, url, null, function(urls) {
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
        
        loadUrl(db, null, null, function(urls) {
            res.send(urls);
        });
    });
});
router.get('/r/:id', function (req, res) {
    var id = req.params.id;
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        loadUrl(db, null, id, function(urls) {
            if ( urls.length>0 ) {
                var url = urls[0];
                res.redirect(url);
            } else {
                res.send({err: "Invalid ID!"});
            }
        });
    });
});
router.get('/', function (req, res) {
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        
        loadUrl(db, null, null, function(urls) {
            res.render('shorturl', {base: req.baseUrl, urls: urls});
        });
    });
});
    
module.exports = router;