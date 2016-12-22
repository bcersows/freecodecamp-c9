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

## Convert submodules
git checkout release
git rm --cached filemetadata && rm -rf filemetadata/.git && git add filemetadata
git rm --cached imagesearch && rm -rf imagesearch/.git && git add imagesearch
git rm --cached timestamp && rm -rf timestamp/.git && git add timestamp
git rm --cached shorturl && rm -rf shorturl/.git && git add shorturl
git rm --cached whoami && rm -rf whoami/.git && git add whoami
git rm .gitmodules
git commit -m "removed submodules"



git checkout release && mv filemetadata filemetadata-tmp && git submodule deinit filemetadata && git rm filemetadata && mv filemetadata-tmp filemetadata && git add filemetadata
git checkout release && mv imagesearch imagesearch-tmp && git submodule deinit imagesearch && git rm imagesearch && mv imagesearch-tmp imagesearch && git add imagesearch
git checkout release && mv timestamp timestamp-tmp && git submodule deinit timestamp && git rm timestamp && mv timestamp-tmp timestamp && git add timestamp
git checkout release && mv shorturl shorturl-tmp && git submodule deinit shorturl && git rm shorturl && mv shorturl-tmp shorturl && git add shorturl
git checkout release && mv whoami whoami-tmp && git submodule deinit whoami && git rm whoami && mv whoami-tmp whoami && git add whoami