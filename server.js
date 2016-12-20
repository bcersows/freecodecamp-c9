const express = require("express");
require('./node_modules/express-group-routes');
require('./node_modules/pug');
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

app.get("/favicon.ico", function(req, res) {
    res.send("");
});

app.group("/test", (router) => {
   router.get('/', function(req, res) {
        res.send("lalala");   
   });
});

app.group("/timestamp", (router) => {
    router.get('/:time', function (req, res) {
        var time = req.params.time;
        var ret = {
            unix: null,
            natural: null
        };
        
        var myRegexp = /^([a-zA-Z]{3,8})\s(\d{1,2}),\s(\d{4})$/;
        var match = myRegexp.exec(time);
        
        if ( /*!isNan(+time) &&*/ (new Date(+time)).getTime() > 0 ) {   // if timestamp
            var date = new Date(+time);
            ret.natural = months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
            ret.unix = time;
        } else if(match) {
            var month = months.indexOf(match[1]);
            if ( month>-1 ) {   // if the month is valid..
                var date = new Date(+match[3], +month, +match[3]);
                ret.unix = date.getTime();
                ret.natural = time;
            }
        } else {
            //ret.unix = null; ret.natural = null;
        }
        res.send(ret)
    })
    router.get('/', function (req, res) {
        res.send('Usage: /<em>timestamp</em> or /<em>natural date, e.g. January 15, 2016</em>. Replace spaces with \%20! <strong>The timestamp should be in ms!</strong>');
    });
});

app.group("/whoami", (router) => {
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
});

app.group("/shorturl", (router) => {
    router.get('/', function (req, res) {
        res.render('shorturl', {base: req.baseUrl});
    });
});



// Default
app.get("/|/about", function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})