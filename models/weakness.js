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
    },
    swot: {
        type: Schema.Types.ObjectId,
        ref: 'Swot'
    }
});

var Weakness = mongoose.model('Weakness', weaknessSchema)

module.exports = {Weakness};