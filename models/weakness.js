var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weaknessSchema = Schema({
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

var Weakness = mongoose.model('Weakness', weaknessSchema)

module.exports = {Weakness};