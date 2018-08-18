const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

var {Strength} = require('../models/strength');

var app = express.Router();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.post('/', (req, res) => {
    var strength = new Strength({
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags,
        createdAt: req.body.createdAt
    });

    strength.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/', (req, res) => {
    Strength.find().then((strength) => {
        res.send({strength})
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Strength.findById(id).then((strength) => {
        if (!strength) {
            return res.status(404).send();
        }

        res.send({strength});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Strength.findByIdAndRemove(id).then((strength) => {
        if (!strength) {
            return res.status(404).send();
        }

        res.send(strength);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'desc', 'tags', 'createdAt']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Strength.findByIdAndUpdate(id, {$set: body}, {new: true}).then((Strength) => {
        if (!Strength) {
            return res.status(404).send();
        }

        res.send({Strength});
    }).catch((e) => {
        res.status(400).send()
    })
})

module.exports = {strength: app};