const express = require("express");
var app = express();

app.use(require('./service_whoami.js'));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})