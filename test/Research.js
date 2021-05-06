const request = require('supertest');
const app = require('../app');
const knexConfig = require('../config/knexfile')['development']
const knex = require('knex')(knexConfig);

let coordToken = null;
let coordId = null
let projectId = null;
