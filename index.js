require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        port: process.env.DB_PORT
    }
});
/*
knex.raw("SELECT * FROM users").then(
    (prof) => console.log(prof) 
).catch(
    (err) => {console.log(err);})
.finally(
    () => {knex.destroy();});*/

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}
//app.use(cors);
app.use(express.json());

app.get('/', verifyJWT, function(req, res){
    res.send("Site de Tecnologia" + req.userId);
});

app.get('/portateis',function(req,res){
    res.send("Categoria de Portateis");
});

app.get('/smartphones',function(req,res){
    res.send("Categoria de Smartphones");
}); 

app.get('/tablets',function(req,res){
    res.send("Categoria de Tablets");
});

app.post('/login', async (req, res, next) => {
    var { email, password } = req.body;

    const userId = (await knex.select().from('users').where({
        'user_email': email,
        'user_password': password
    })).map((user) => user.user_id)

    if (userId.length > 0) {
        const id = userId[0];
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 100
        });
        return res.json({auth: true, token: token});
    }
    res.status(500).json({message: 'Login invalido!'})
})

app.post('/register', (req, res) => {
    let { body } = req;
    let profileId = (await knex.select().from('profiles').where({
        prof_tag: body.tag
    })).map((profile) => profile.prof_id)

    if (profileId.length > 0) {
        profileId = profileId[0];
        try {
            const createdUser = (await knex.insert({
                prof_id: profileId,
                user_name: body.name,
                user_cpf: body.cpf,
                user_email: body.email,
                user_password: body.password
            }).returning())
            console.log(createdUser);
        } catch {
            res.status(500).json({message: 'Dados inválidos!'})
        }

    } else {
        res.status(500).json({message: 'Tag invalida!'})
    }
})

app.post('/logout', (req, res) => {
    res.json({ auth: false, token: null });
})

app.listen(process.env.SERVER_PORT,function(){
    console.log(`Servidor ativo na porta ${process.env.SERVER_PORT}`);
});