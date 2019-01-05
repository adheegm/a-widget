const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/aw-controls-demo'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname,'/dist/aw-controls-demo/index.html'));
});

app.listen(process.env.PORT || 8080);
