const express = require('express');
const router  = express.Router();
const Thing = require('../models/thing');
function getRejected(res, statusCode) {
    return (error) => {
        res.status(statusCode).json({
            error: error
        });
    };
}

//post route (saving a new thing)
router.post('/', (req, res, next) => {
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
    ).catch(getRejected(res,400));
});

//retrieve
router.get('/:id', (req, res, next) => {

    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(getRejected(res,400));
});



//update one
router.put('/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId,
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(getRejected(res, 400));

});

//delete one
router.delete('/:id', (req, res, next) => {

    Thing.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Thing deleted successfully!'
            });
        }
    ).catch(getRejected(res, 400));

});

//get all things
router.get('/', (req, res, next) => {

    Thing.find().then(
        (things) => {
            res.status(200).json(things)

        }
    ).catch(getRejected(res,400));
});



module.exports = router;