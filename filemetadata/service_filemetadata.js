var express = require('express')
  , router = express.Router();
var fs = require('fs');
var multer  = require('multer')

var uploadPath = 'uploads/';
var upload = multer({ dest: uploadPath })

router.post('/upload', upload.single('myupload'), function (req, res) {
    if ( req.file ) {
        var ret = {
            name: req.file.originalname,
            size: req.file.size,
            sizeType: "Byte"
        };
        fs.unlink(req.file.path, function(){});
        res.send(ret);
    } else {
        res.send({err: "No file sent."});
    }
});
router.get('/', function (req, res) {
    res.render(__dirname + '/views/filemetadata', {base: req.baseUrl});
});
    
module.exports = router;