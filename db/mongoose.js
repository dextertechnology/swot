var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoURI = 'mongodb://diwap:diwakar123@ds125272.mlab.com:25272/diwap';

mongoose.connect(mongoURI, {useNewUrlParser: true});

module.exports = {mongoose};