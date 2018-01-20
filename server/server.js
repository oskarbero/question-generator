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


const settingsPath = './resources/configs.json';
const drugListPath = './resources/drugList.json';
const getSettings = function() { return JSON.parse(fs.readFileSync(settingsPath)) };
const getDrugList = function() { return JSON.parse(fs.readFileSync(drugListPath)) };
const saveNewSettings = function(newSettings) { return fs.writeFileSync(settingsPath, JSON.stringify(newSettings))};

app.post('/setCategories', function(req, res, next) {
    console.log('req body', req.body);

    const newSettings = Object.assign({}, getSettings(), req.body);
    console.log('new settings', newSettings);

    saveNewSettings(newSettings);
    res.json(newSettings);
    next();
});

app.get('/getCategories', function(req, res) {
    res.send(getSettings());
});

app.get('/getDrugList', function(req, res) {
    res.send(getDrugList());
});

app.get('/getActiveDrugList', function(req, res) {
    const drugList = getDrugList();
    const active = getSettings();
    // console.log(settings);



    // Object.values(settings).forEach(val => {
    // })
    // Object.keys(drugList).forEach(key =>
    //     {
    //         if(settings[key]){
    //             active.push(drugList[key]);
    //         }
    //     }
    // )
    // console.log(active.length);


    res.send({drugList, active});
});

          

app.listen(app.get("port"), function() {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });