var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threatsSchema = Schema({
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

var Threats = mongoose.model('Threats', threatsSchema)

module.exports = {Threats};