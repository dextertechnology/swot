const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

var {Threats} = require('../models/threats');

var app = express.Router();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.post('/', (req, res) => {
    var threats = new Threats({
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags,
        createdAt: req.body.createdAt
    });

    threats.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/', (req, res) => {
    Threats.find().then((threats) => {
        res.send({threats})
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Threats.findById(id).then((threats) => {
        if (!threats) {
            return res.status(404).send();
        }

        res.send({threats});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Threats.findByIdAndRemove(id).then((threats) => {
        if (!threats) {
            return res.status(404).send();
        }

        res.send(threats);
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

    Threats.findByIdAndUpdate(id, {$set: body}, {new: true}).then((Threats) => {
        if (!Threats) {
            return res.status(404).send();
        }

        res.send({Threats});
    }).catch((e) => {
        res.status(400).send()
    })
})

module.exports = {threats: app};