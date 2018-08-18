var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var opportunitiesSchema = Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    tags: {
        type: [String],
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Opportunities = mongoose.model('Opportunities', opportunitiesSchema)

module.exports = {Opportunities};