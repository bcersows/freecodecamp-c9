var express = require('express')
  , router = express.Router();
var imageSearch = require('node-google-image-search');
//require('pug');

var dbUrl = 'mongodb://localhost:27017/imagesearch';
var collectionName = "imagesearch";
var mongo = require('mongodb').MongoClient

function saveSearch(searchTerm) {
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        var collection = db.collection(collectionName)
        var obj = {
            search: searchTerm,
            when: new Date()
        }
        collection.insert(obj, function(err, data) {
            if (err) throw err
            db.close()
        })
    });
}

function loadHistory(callback) {
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        var collection = db.collection(collectionName)
        collection.find().skip(collection.count() - 10).toArray(function(err, latest) {
            if (err) throw err
            callback(latest);
            db.close();
        });
    });
}

router.get('/latest', function (req, res) {
    loadHistory(function(latest) {
        res.send(latest);
    });
});
router.get('/search/:search', function (req, res) {
    var search = req.params.search;
    var offset = +req.query.offset || 0;
    var length = 10;
    imageSearch(search, function(results) {
        var ret = [];
        for ( var i = 0; i<results.length; i++ ) {
            var result = results[i];
            ret.push({
                url: result.link,
                page: result.image.contextLink,
                alt: result.title
            });
        }
        saveSearch(search);
        res.send(ret);
    }, offset, offset+length);
});
router.get('/', function (req, res) {
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        
        res.render(__dirname + '/views/imagesearch', {base: req.baseUrl});
    });
});
    
module.exports = router;