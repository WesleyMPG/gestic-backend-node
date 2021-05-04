// TODO: registar no index do modulo
const { ResearchGroupService } = require('../services');
const groupService = new ResearchGroupService();
verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await groupService.getGroups();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await groupService.getById({ ...req.params });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.post('/', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.insert({
            ...req.body, token: req.cookies['x-access-token']});
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.put('/', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.update({
            ...req.body, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.delete({ ...req.params, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})
