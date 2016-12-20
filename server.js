const express = require("express");
var app = express()

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

app.get("/favicon.ico", function(req, res) {
    res.send("");
});
app.get('/:time', function (req, res) {
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
app.get('/', function (req, res) {
    res.send('Usage: /<em>timestamp</em> or /<em>natural date, e.g. January 15, 2016</em>. Replace spaces with \%20! <strong>The timestamp should be in ms!</strong>');
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})