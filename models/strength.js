var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var strengthSchema = Schema({
    title: {
        type: String,
        default: null
    },
    desc: {
        type: String,
        default: null
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

var Strength = mongoose.model('Strength', strengthSchema)

module.exports = {Strength};