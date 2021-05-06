const request = require('supertest');
const app = require('../app');
const knexConfig = require('../config/knexfile')['development']
const knex = require('knex')(knexConfig);

let alunId = null;
let alunToken = null;
let coordToken = null;

// TODO: testes das rotas de update de todos os services

describe('Testing user routes',  () => {

    afterAll(() => {
        knex.destroy();
    })

    it('Should create an user', async () => {
        const res = await request(app)
            .post('/access/register')
            .send({
                name: 'aluno3',
                email: 'aluno3@ic.ufal.br',
                password: '1234'
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'profileId',
        'name', 'email', 'password', 'status', 'profileTag');

        alunId = res.body.id;
    })

    it('Should login', async () => {
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@teste.com",
                password: "1234"
            });
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('token');
        coordToken = 'bearer ' + res.body.token;
    })

    it('Should logout', async () => {
        const resLogin = await request(app)
            .post('/access/login')
            .send({
                email: 'aluno3@ic.ufal.br',
                password: '1234'
            })
        alunToken = 'bearer ' + resLogin.body.token;
        const res = await request(app)
            .get('/access/logout')
            .set('Authorization', alunToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('auth');
        expect(res.body.auth).toBeFalsy();
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeNull();
    })

    // rota de update

    it('Should delete an user', async () =>{
        const res = await request(app)
            .delete('/user/' + alunId)
            .set('Authorization', coordToken);
        expect(coordToken).toEqual(expect.anything());
        expect(res.ok).toBeTruthy();
    })

    it('Should get an user', async () => {
        const res = await request(app)
            .get('/user/')
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'profileId',
        'name', 'email', 'password', 'status', 'profileTag');
    })

})
