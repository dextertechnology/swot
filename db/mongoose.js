var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoURI = '';

mongoose.connect(mongoURI, {useNewUrlParser: true});

module.exports = {mongoose};