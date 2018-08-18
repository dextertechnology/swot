var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoURI = 'mongodb://diwap:diwakar123@ds020938.mlab.com:20938/diwap';

mongoose.connect(mongoURI, {useNewUrlParser: true});

module.exports = {mongoose};