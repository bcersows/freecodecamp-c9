const express = require("express");
var app = express()

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

app.get("/favicon.ico", function(req, res) {
    res.send("");
});
app.get('/:time', function (req, res) {
    var time = req.params.time;
    var ret = {
        unix: time,
        natural: time,
        type: typeof time
    };
    console.log(new Date(+time).getTime());
    console.log(Date.parse(+time));
    console.log(isNaN(Date.parse(+time)));
    if ( /*!isNan(+time) &&*/ (new Date(+time)).getTime() > 0 ) {   // if timestamp
        var date = new Date(+time);
        ret.natural = months[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
    } else {
        ret = 'Usage: /<timestamp> or /<natural date, e.g. January 15, 2016>. You gave: ' + time + ".";
    }
    res.send(ret)
})
app.get('/', function (req, res) {
    res.send('Usage: /<em>timestamp</em> or /<em>natural date, e.g. January 15, 2016</em>. <strong>The timestamp should be in ms!</strong>');
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})