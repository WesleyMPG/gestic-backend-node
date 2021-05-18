const request = require('supertest');
const app = require('../src/app');
const config = require('../src/config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);


let coordToken = null;
let coordId = null
let projectId = null;

describe('Testing project routes', () => {

    beforeAll(async () =>{
        const res = await request(app)
            .post('/access/login')
            .send({
                email : "coord1@ic.ufal.br",
                password: "1234"
            });
        coordToken = 'Bearer ' + res.body.token;
        coordId = res.body.id
    })

    afterAll(() => {
        sequelize.close();
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
                name: "proj exemplo4",
                description: "uma descrição",
                userId: coordId
                })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'userId');
        projectId = res.body.id
    })

    it('Should update a project', async () => {
        const res = await request(app)
            .put('/project')
            .send({
                id: projectId,
                name: 'projeto',
                description: 'descrição',
            })
            .set('Authorization', coordToken);
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveProperty('id', 'name', 'description',
                'uerId');
        expect(res.body.name).toEqual('projeto');
        expect(res.body.description).toEqual('descrição');
    })

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