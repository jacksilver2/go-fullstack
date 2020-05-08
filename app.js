console.log('firing up app');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');

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

app.use('/api/stuff', stuffRoutes)

module.exports = app;