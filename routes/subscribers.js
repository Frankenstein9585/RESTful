const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

const getSubscriber = async (req, res, next) => {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber === null) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.subscriber = subscriber;
    next();
}

// Get all Subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

// Creating one subscriber
router.post('/', async (req, res) => {
    const { name, subscribedToChannel } = req.body;
    const subscriber = new Subscriber({
        name,
        subscribedToChannel
    });
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// Updating one subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    const { name, subscribedToChannel } = req.body;
    if (name) {
        res.subscriber.name = name;
    }

    if (subscribedToChannel) {
        res.subscriber.subscribedToChannel = subscribedToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.status(201).json(updatedSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


});

// Deleting one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({ message: 'Subscriber deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;