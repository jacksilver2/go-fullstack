console.log('firing up app');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

const app = express();
//connection
mongoose.connect(
    'mongodb+srv://jacksilver:UzfPjI2VdXw9GcuL@cluster0-5kbqd.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('successfully connected to MongoDB');
    })
    .catch((error) => {
        console.log('unable to connect to mongodb');
        console.error(error);
    });


//headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//post route
app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId,
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'post sent successfully'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//get all things
app.use('/api/stuff', (req, res, next) => {
    console.log('entering get route');
    Thing.find().then(
        (things) => {
            res.status(200).json(things)
            console.log('got promise')
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});


module.exports = app;