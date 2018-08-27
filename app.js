const express = require('express');

var app = express();
const port = process.env.PORT || 5000;

var {person} = require('./routes/person');
var {swot} = require('./routes/swot');
var {strength} = require('./routes/strength');
var {weakness} = require('./routes/weakness');
var {opportunities} = require('./routes/opportunities');
var {threats} = require('./routes/threats');

app.use('/person',person);
app.use('/swot', swot);
app.use('/strength', strength);
app.use('/weakness', weakness);
app.use('/opportunities', opportunities);
app.use('/threats', threats);

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});