var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 6
    },
    position: {
        type: String,
        default: null,
        trim: true
    },
    address: {
        type: String,
        default: null,
        trim: true
    },
    company: {
        type: String,
        default: null,
        trim: true
    },
    age: {
        type: Number,
        default: null
    }
});

var Person = mongoose.model('Person', personSchema);

module.exports = {Person};