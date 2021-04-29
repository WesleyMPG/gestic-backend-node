const GenericRepository = require("./GenericRepository");
const InformativeBuilder = require('../builder/Informative');

class Informative extends GenericRepository {
    constructor() {
        super(new InformativeBuilder);
    }
}

module.exports = Informative;
