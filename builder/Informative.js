const GenericBuilder = require('./GenericBuilder.js');

class Informative extends GenericBuilder {
    constructor() {
        super();
        this.tableName = 'informatives';
        this.dictionary = [
            ['id', 'info_id'],
            ['title', 'info_title'],
            ['content', 'info_content']
        ];
    }
}

module.exports = Informative;
