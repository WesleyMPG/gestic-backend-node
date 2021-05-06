const request = require('supertest');
const app = require('../app');
const knexConfig = require('../config/knexfile')['development']
const knex = require('knex')(knexConfig);

let coordToken = null;
let offerId = null;

describe('Testing class offer routes', () => {

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

    it('Should get all class offers', async () => {
        const res = await request(app)
            .get('/offer');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a class offer', async () => {
        const res = await request(app)
            .post('/offer')
            .send({
                name: "turma exemplo4",
                code: "cc8888",
                codeClassroom: "#",
                linkClassroom: "#",
                linkMeets: "#",
                linkWpp: "#",
                linkTel: "#"})
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'code',
        'codeClassroom', 'linkMeets', 'linkWpp', 'linkTel');
        offerId = res.body.id;
    })

    // rota de update

    it('Should get a class offer', async () => {
        const res = await request(app)
            .get('/offer/' + offerId);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'code',
        'codeClassroom', 'linkMeets', 'linkWpp', 'linkTel');
        expect(res.body.id).toEqual(offerId);
    })

    it('Should delete a class offer', async () => {
        const res = await request(app)
            .delete('/offer/' + offerId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body.id).toEqual(offerId);

        const resGet = await request(app)
            .get('/offer/' + offerId);
        expect(resGet.ok).toBeFalsy();
    })

    it('Should delete all class offers', async () => {
        const res = await request(app)
            .delete('/offer')
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();

        const resGetAll = await request(app)
            .get('/offer');
        expect(resGetAll.body).toHaveLength(0);
    })
})