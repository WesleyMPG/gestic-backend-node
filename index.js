require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const formData = require('form-data');
const multer = require('multer');
const multerConfig = require('./config/multerConfig');
const upload = multer(multerConfig.storage);
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./config/swagger.yaml');
const bcrypt = require('bcrypt')

const { UserService, FileService, ProjectService, ClassGroupService } = require('./services');
const userService = new UserService();
const fileService = new FileService();
const projectService = new ProjectService();
const classGroupService = new ClassGroupService();

const verifyJWT = require('./config/configJWT');

const UserRepository = require('./repository/User')
const userRepository = new UserRepository();

var corsOptions = {
    origin: process.env.CLIENT_HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', verifyJWT, function (req, res) {
    res.send("Bem vindo a versão V0.0 do backend da aplicação GestIC!");
});

app.post('/login', async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.put('/approve-user/:id', async (req, res) => {
    try {
        const result = await userService.approveUserById(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
})

app.put('/approve-user', async (req,res) => {
    try {
        const result = await userService.approveMultipleUsersById(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
})

app.put('/user', async (req,res) => {
    try {
        const result = await userService.updateUser(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
})

app.get('/user', async (req,res) => {
    try {
        const result = await userService.getListOfUsersByStatus();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
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

app.post('/file', upload.single('file'), async (req, res) => {
    const { file } = req;
    try {
        const result = await fileService.insertFile({ ...req.body, ref: req.file.filename });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.get('/download-file', function (req, res) {
    const file = `${multerConfig.uploadsPath}/${req.body.ref}`;
    res.status(200).download(file);
});

app.get('/file', async (req, res) => {
    try {
        const result = await fileService.getFiles(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.post('/project', async (req, res) => {
    try {
        const result = await projectService.insertProject(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.get('/project', async (req, res) => {
    try {
        const result = await projectService.getProjects();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.put('/project', async (req, res) => {
    try {
        const result = await projectService.updateProject(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.delete('/project/:id', async (req, res) => {
    try {
        const result = await projectService.deleteProject(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.get('/project/:id', async (req, res) => {
    try {
        const result = await projectService.getProjectById(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
})

app.post('/class-group', async(req, res) => {
    try {
        const result = await classGroupService.insertClassGroup(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
})

app.get('/class-group', async(req, res) => {
    try {
        const result = await classGroupService.getClassGroups();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
})

app.put('/class-group', async(req,res) => {
    try {
        const result = await classGroupService.updateClassGroup(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
})

app.delete('/class-group', async(req,res) => {
    try {
        const result = await classGroupService.deleteClassGroups();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
})

app.get('/class-group/:id', async(req, res) => {
    try {
        const result = await classGroupService.getClassGroupById(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
})

app.delete('/class-group/:id', async(req,res) => {
    try {
        const result = await classGroupService.deleteClassGroupById(req.params);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message});
    }
})


app.post('/logout', (req, res) => {
    res.json({ auth: false, token: null });
})


app.get('/test', async (req, res) => {
    const {password} = req.body


    const salt = await bcrypt.genSalt()
    const passHash = await bcrypt.hash(password, salt);
    
    if (await bcrypt.compare(password, passHash)) {        
        res.status(200).json({pass:password,hash:passHash});
    } else {
        res.status(500).json({ message: "Erro" });
    }
    

})

const server = app.listen(process.env.SERVER_PORT, function () {
    console.log(`Servidor ativo na porta ${process.env.SERVER_PORT}`);
});

process.on('SIGINT', () => {
    process.kill(process.pid)
    server.close(() => {
        console.log('Process terminated')
    });
});