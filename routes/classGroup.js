const { ClassGroupService } = require('../services')
const classGroupService = new ClassGroupService();
const verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();

router.post('/', verifyJWT, async (req, res) => {
    try {
        const result = await classGroupService.insertClassGroup({ ...req.body, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/', verifyJWT, async (req, res) => {
    try {
        const result = await classGroupService.getClassGroups(req.cookies['x-access-token']);
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
        const result = await classGroupService.updateClassGroup({ ...req.body, token: req.cookies['x-access-token'] });
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
        const result = await classGroupService.deleteClassGroups(req.cookies['x-access-token']);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/:id', verifyJWT, async (req, res) => {
    try {
        const result = await classGroupService.getClassGroupById({ ...req.params, token: req.cookies['x-access-token'] });
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
        const result = await classGroupService.deleteClassGroupById({ ...req.params, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})


module.exports = router;
