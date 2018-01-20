var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.set("port", process.env.PORT || 3001);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());                             // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     // for parsing application/x-www-form-urlencoded

app.post('/setCategories', function(req, res, next) {
    const settingsPath = './resources/settings.json';
    const curSettings = JSON.parse(fs.readFileSync(settingsPath));
    console.log('req body', req.body);
    const newSettings = Object.assign({}, curSettings, req.body);
    console.log('new settings', newSettings);
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings));
    res.json(newSettings);
    next();
});

app.get('/getCategories', function(req, res) {
    const settingsPath = './resources/settings.json';
    const curSettings = JSON.parse(fs.readFileSync(settingsPath));
    res.send(curSettings);
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });