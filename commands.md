1. `git clone`
1. `npm init`
1. `npm install --save express` (and other)
1. Index like:

```
const express = require("express");
var app = express();

app.use(require('./service_timestamp.js'));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
```

Add submodule: `git submodule add ssh://git@github.com/bcersows/freecodecamp-timestamp timestamp`