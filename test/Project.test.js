const request = require('supertest');
const app = require('../app');
const knexConfig = require('../config/knexfile')['development']
const knex = require('knex')(knexConfig);

let coordToken = null;
let coordId = null
let projectId = null;

describe('Testing project routes', () => {

    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@teste.com",
                password: "1234"
            });
        coordToken = 'bearer ' + res.body.token;
        coordId = res.body.id
    })

    afterAll(() => {
        knex.destroy();
    })

    it('Should get all projects', async () => {
        const res = await request(app)
            .get('/project');
        expect(res.ok).toBeTruthy();
        expect(res.body instanceof Array).toBe(true);
    })

    it('Should create a project', async () => {
        const res = await request(app)
            .post('/project')
            .send({
                name: "turma exemplo4",
                description: "cc8888",
                userId: coordId
                })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'userId');
        projectId = res.body.id;
    })

    // rota de update

    it('Should get a project', async () => {
        const res = await request(app)
            .get('/project/' + projectId);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'userId');
        expect(res.body.id).toEqual(projectId);
    })

    it('Should delete a project', async () => {
        const res = await request(app)
            .delete('/project/' + projectId)
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body.id).toEqual(projectId);

        const resGet = await request(app)
            .get('/project/' + projectId);
        expect(resGet.ok).toBeFalsy();
        })

})