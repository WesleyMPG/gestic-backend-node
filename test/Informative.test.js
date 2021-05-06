const request = require('supertest');
const app = require('../app');
const knexConfig = require('../config/knexfile')['development']
const knex = require('knex')(knexConfig);

let coordToken = null;
let infoId = null;

describe('Testing informatives routes', () => {
    
    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@teste.com",
                password: "1234"
            });
        coordToken = 'bearer ' + res.body.token;
    })

    afterAll(() => {
        knex.destroy();
    })

    it('Should get all informatives', async () => {
        const res = await request(app)
            .get('/informative');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a informative', async () => {
        const res = await request(app)
            .post('/informative')
            .send({
                "title": "teste122",
                "content": "What is Lorem Ipsum? Lorem Ipsum is \
                simply dummy text of the printing and typesetting industry."})
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'title', 'content');
        infoId = res.body.id;
    })

    // rota de update

    it('Should get a informative by its id', async () => {
        const res = await request(app)
            .get('/informative/' + infoId)
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'title', 'content');
    })

    it('Should delete a informative', async () => {
        const res = await request(app)
            .delete('/informative/' + infoId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
    })
})