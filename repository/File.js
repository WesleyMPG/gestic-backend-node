const GenericRepository = require("./GenericRepository");
const FileBuilder = require('../builder/File');

class File extends GenericRepository{
    constructor(){
        super(new FileBuilder())
    }
}

module.exports = File;