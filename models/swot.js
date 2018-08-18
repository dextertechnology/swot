var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var swotSchemma = Schema({
    title: {
        type: String,
        required: true
    },
    dateFrom: {
        type: {
            type: Date, default: Date.now
        }
    },
    dateTo: {
        type: {
            type: Date, default: Date.now
        }
    },
    active: {
        type: Boolean,
        default: true
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }
});

var Swot = mongoose.model('Swot', swotSchemma);

module.exports = {Swot};