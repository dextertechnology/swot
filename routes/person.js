const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

var {Person} = require('../models/person');

var app = express.Router();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.post('/', (req, res) => {
    var person = new Person({
        name: req.body.name,
        position: req.body.position,
        address: req.body.address,
        company: req.body.company,
        age: req.body.age
    });

    person.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/', (req, res) => {
    Person.find().then((person) => {
        res.send({person})
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Person.findById(id).then((person) => {
        if (!person) {
            return res.status(404).send();
        }

        res.send({person});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Person.findByIdAndRemove(id).then((person) => {
        if (!person) {
            return res.status(404).send();
        }

        res.send(person);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'address', 'position', 'company', 'age']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Person.findByIdAndUpdate(id, {$set: body}, {new: true}).then((Person) => {
        if (!Person) {
            return res.status(404).send();
        }

        res.send({Person});
    }).catch((e) => {
        res.status(400).send()
    })
})

module.exports = {person: app};