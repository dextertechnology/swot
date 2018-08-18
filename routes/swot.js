const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

var {Swot} = require('../models/swot');

var app = express.Router();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.post('/', (req, res) => {
    var swot = new Swot({
        title: req.body.title,
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        active: req.body.active,
        person: req.body.person
    });

    swot.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/', (req, res) => {
    Swot.find().then((swot) => {
        res.send({swot})
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Swot.findById(id).then((swot) => {
        if (!swot) {
            return res.status(404).send();
        }

        res.send({swot});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Swot.findByIdAndRemove(id).then((swot) => {
        if (!swot) {
            return res.status(404).send();
        }

        res.send(swot);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'dateFrom', 'dateTo', 'active', 'person']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Swot.findByIdAndUpdate(id, {$set: body}, {new: true}).then((Swot) => {
        if (!Swot) {
            return res.status(404).send();
        }

        res.send({Swot});
    }).catch((e) => {
        res.status(400).send()
    })
})

module.exports = {swot: app};