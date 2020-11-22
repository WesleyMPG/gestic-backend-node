require('dotenv/config');

const knexConfig = require('../knexfile')['development']
const knex = require('knex')(knexConfig);

class GenericRepository {

    constructor(builder) {
        this.builder = builder;
    }

    // get only 1 object
    async getRow(filter) {
        const fetchedRow = (await knex
            .select()
            .from(this.builder.tableName)
            .where(this.builder.parse(filter))).map((object) => this.builder.unparse(object));
        return fetchedRow[0];
    }

    // get multiple objects
    async getRows(filter) {
        const fetchedRows = (await knex
            .select()
            .from(this.builder.tableName)
            .where(this.builder.parse(filter))).map((object) => this.builder.unparse(object));
        return fetchedRows;
    }

    // insert only 1 object
    async insertRow(parameters) {
        const insertedRow = (await knex(this.builder.tableName)
            .insert(this.builder.parse(parameters))
            .returning(this.builder.dictionary.map((dict) => dict[1]))).map((object) => this.builder.unparse(object));
        return insertedRow[0];
    }

    // insert multiple object
    async insertRows(parameters) {
        const insertedRows = (await knex(this.builder.tableName)
            .insert(parameters.map((it) => this.builder.parse(it)))
            .returning(this.builder.dictionary.map((dict) => dict[1]))).map((object) => this.builder.unparse(object));
        return insertedRows;
    }

    // update 1 row
    async updateRow(filter, parameters) {
        const updatedRow = (await knex(this.builder.tableName)
            .where( this.builder.parse(filter) )
            .update( this.builder.parse(parameters), this.builder.dictionary.map((dict) => dict[1])) ).map((object) => this.builder.unparse(object));
        return updatedRow[0];
    }

    // update multiple rows
    async updateRows(filter, parameters) {
        const updatedRows = (await knex(this.builder.tableName)
            .where( this.builder.parse(filter) )
            .update( this.builder.parse(parameters), this.builder.dictionary.map((dict) => dict[1])) ).map((object) => this.builder.unparse(object));
        return updatedRows;
    }

    // delete 1 row
    async deleteRow(filter) {
        const deletedRow = await this.getRow(filter);
        (await knex(this.builder.tableName)
        .where( this.builder.parse(filter) )
        .del())

        return deletedRow;
    }

    // delete multiple rows
    async deleteRows(filter) {
        const deletedRows = await this.getRows(filter);
        (await knex(this.builder.tableName)
        .where( this.builder.parse(filter) )
        .del())

        return deletedRows;
    }




}

module.exports = GenericRepository;