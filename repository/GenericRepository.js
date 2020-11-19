require('dotenv/config');

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

class GenericRepository {

    constructor (builder) {
        this.builder = builder;
    }

    // get only 1 object
    async getRow(filter) {
        const fetchedRow = (await knex
            .select()
            .from(this.builder.tableName)
            .where(this.builder.parse(filter)) ).map((object) => this.builder.unparse(object));        
        return fetchedRow[0]
    }

    // insert only 1 object
    async insertRow(parameters) {
        const insertedRow = (await knex(this.builder.tableName)
        .insert(this.builder.parse(parameters))
        .returning(this.builder.dictionary.map((dict) => dict[1])) ).map((object) => this.builder.unparse(object));

        return insertedRow[0];
    }


}

module.exports = GenericRepository;