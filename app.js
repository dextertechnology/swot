const express = require('express');
var mongoose = require('mongoose');

var app = express();

var {person} = require('./routes/person');

app.use('/',person)

app.listen(8068, () => {
    console.log('Started on port 8068');
});