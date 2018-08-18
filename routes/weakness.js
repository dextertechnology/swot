const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('../db/mongoose');

var {Weakness} = require('../models/weakness');

var app = express.Router();

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

app.post('/', (req, res) => {
    var weakness = new Weakness({
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags,
        createdAt: req.body.createdAt,
        swot: req.body.swot
    });

    weakness.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/', (req, res) => {
    Weakness.find().then((weakness) => {
        res.send({weakness})
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Weakness.findById(id).then((weakness) => {
        if (!weakness) {
            return res.status(404).send();
        }

        res.send({weakness});
    }).catch((e) => {
        res.status(400).send();
    })
})

app.delete('/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Weakness.findByIdAndRemove(id).then((weakness) => {
        if (!weakness) {
            return res.status(404).send();
        }

        res.send(weakness);
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

    Weakness.findByIdAndUpdate(id, {$set: body}, {new: true}).then((Weakness) => {
        if (!Weakness) {
            return res.status(404).send();
        }

        res.send({Weakness});
    }).catch((e) => {
        res.status(400).send()
    })
})

module.exports = {weakness: app};