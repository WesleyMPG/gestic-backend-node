require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./config/swagger.yaml');

const routes = require('./routes/index')

const verifyJWT = require('./config/configJWT');

var corsOptions = {
    origin: process.env.CLIENT_HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/access', routes.access);
app.use('/user', routes.user);
app.use('/file', routes.file);
app.use('/project', routes.project);
app.use('/offer', routes.offer);
app.use('/informative', routes.informative);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', verifyJWT, (req, res) => {
    res.send("Bem vindo a versão V0.0 do backend da aplicação GestIC!");
});

const server = app.listen(process.env.PORT, function () {
    console.log(`Servidor ativo na porta ${process.env.DB_PORT || process.env.PORT}`);
});

process.on('SIGINT', () => {
    process.kill(process.pid)
    server.close(() => {
        console.log('Process terminated')
    });
});
