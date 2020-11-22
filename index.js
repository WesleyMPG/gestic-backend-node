require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const { UserService } = require('./services');
const userService = new UserService();

const verifyJWT = require('./configJWT');

const UserRepository = require('./repository/User')
const userRepository = new UserRepository();

//app.use(cors);
app.use(express.json());

app.get('/', verifyJWT, function (req, res) {
    res.send("Bem vindo a versão V0.0 do backend da aplicação < pending > !");
});

app.post('/login', async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
})

app.post('/register', async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})


app.post('/logout', (req, res) => {
    res.json({ auth: false, token: null });
})


app.get('/test', async (req, res) => {
    const result = await userRepository.getRows({
        profileId: '3a2744c1-fa73-43f1-bceb-a8cee76e5f35'
    })
    
    console.log(result);
    res.status(500).json(result);
})

app.listen(process.env.SERVER_PORT, function () {
    console.log(`Servidor ativo na porta ${process.env.SERVER_PORT}`);
});