var express = require('express')
  , router = express.Router()

router.get('/', function (req, res) {
    //console.log(req.headers);
    var os = req.headers['user-agent'];
    os = os.replace(/^.*\((.+)\).*$/, "$1");
    var ret = {
        ip: req.headers['x-forwarded-for'],
        os: os,
        language: req.headers['accept-language'].split(";")[0].split(",")[0],
    };
    res.send(ret);
});
    
module.exports = router;