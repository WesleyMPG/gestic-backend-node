const { UserService } = require('../services');
const userService = new UserService();
const verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();

router.put('/', verifyJWT, async (req, res) => {
    try {
        const result = await userService.updateUser({ ...req.body, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.delete('/:id/', verifyJWT, async (req, res) => {
    try {
        const result = await userService.deleteUserById({ ...req.params, token: req.cookies['x-access-token'] });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/:status', verifyJWT, async (req, res) => {
    try {
        const result = await userService.getListOfUsers({ ...req.params, token: req.cookies['x-access-token'] });
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
        const result = await userService.getUserById({
            id: req.userId, token: req.cookies['x-access-token']
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

module.exports = router;
