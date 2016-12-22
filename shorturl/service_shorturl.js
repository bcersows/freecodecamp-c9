var express = require('express')
  , router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var shortid = require('shortid');
//require('pug');

var dbUrl = 'mongodb://localhost:27017/urls';
var collectionName = "shorturl";
var mongo = require('mongodb').MongoClient

function loadUrl(db, url, id, callback) {
    var collection = db.collection(collectionName)
        var find = {};
        if ( url ) { find.url = url; }
        if ( id ) {
            var o_id = id;
            find._id = o_id;
        }
        //console.log(find);
        collection.find(find).toArray(function(err, urls) {
            if (err) throw err
            callback(urls);
    })
}

router.get('/new', function (req, res) {
    var url = req.query.p;
    if ( !url ) { res.send("Please specify URL as query parameter 'p'!"); return; }
    if ( (url.match(/^https?:\/\/www\d?\.\w+(\.\w+)+(\/\w+)*\/?$/)||[]).length<1 ) { res.send("URL format has to be 'http[s]://www.&lt;host&gt;.&lt;tld&gt;[/&lt;path&gt;]'"); return; }
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        loadUrl(db, url, null, function(urls) {
            var obj = {
                url: url,
                _id: shortid.generate()
            };
            if ( urls.length>0 ) {
                obj.msg = "Already existing.";
                obj.id = urls[0]._id;
                delete obj._id;
                res.send(obj);
                return false;
            }
            
            var collection = db.collection(collectionName)
            collection.insert(obj, function(err, data) {
                if (err) throw err
                obj.id = data.ops[0]._id;
                delete obj._id;
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
                res.redirect(url.url);
            } else {
                res.send({err: "Invalid ID!", id: id, urls: urls});
            }
        });
    });
});
router.get('/', function (req, res) {
    mongo.connect(dbUrl, function(err, db) {
        if (err) throw err
        
        loadUrl(db, null, null, function(urls) {
            res.render(__dirname + '/views/shorturl', {base: req.baseUrl, urls: urls});
        });
    });
});
    
module.exports = router;