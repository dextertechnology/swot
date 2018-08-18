const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

var {Opportunities} = require('../models/opportunities');

var app = express.Router();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.post('/', (req, res) => {
    var opportunities = new Opportunities({
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags,
        createdAt: req.body.createdAt,
        swot: req.body.swot
    });

    opportunities.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/', (req, res) => {
    Opportunities.find().then((opportunities) => {
        res.send({opportunities})
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Opportunities.findById(id).then((opportunities) => {
        if (!opportunities) {
            return res.status(404).send();
        }

        res.send({opportunities});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Opportunities.findByIdAndRemove(id).then((opportunities) => {
        if (!opportunities) {
            return res.status(404).send();
        }

        res.send(opportunities);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'desc', 'tags', 'createdAt', 'swot']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Opportunities.findByIdAndUpdate(id, {$set: body}, {new: true}).then((Opportunities) => {
        if (!Opportunities) {
            return res.status(404).send();
        }

        res.send({Opportunities});
    }).catch((e) => {
        res.status(400).send()
    })
})

module.exports = {opportunities: app};