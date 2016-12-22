const express = require("express");
require('pug');
var app = express();

app.set('view engine', 'pug');
app.use(require('./service_shorturl.js'));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})