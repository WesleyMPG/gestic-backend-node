const { OfferService } = require('../services')
const offerService = new OfferService();
const verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();

router.post('/', verifyJWT, async (req, res) => {
    try {
        const result = await offerService.insertOffer({ ...req.body, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await offerService.getOffers();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.put('/', verifyJWT, async (req, res) => {
    try {
        const result = await offerService.updateOffer({ ...req.body, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.delete('/', verifyJWT, async (req, res) => {
    try {
        const result = await offerService.deleteOffers(req.cookies['x-access-token']);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await offerService.getOfferById({ ...req.params });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        const result = await offerService.deleteOfferById({ ...req.params, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})


module.exports = router;
