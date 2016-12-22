const express = require("express");
require('./node_modules/pug');
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get("/favicon.ico", function(req, res) {
    res.send("");
});

app.use("/timestamp", require('./timestamp/service_timestamp'));

app.use('/whoami', require('./whoami/service_whoami'))

app.use('/shorturl', require('./shorturl/service_shorturl'))

app.use('/imagesearch', require('./imagesearch/service_imagesearch'))

app.use('/filemetadata', require('./filemetadata/service_filemetadata'))


// Default
app.get("/|/about", function(req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Example app listening on port '+port+'!')
})