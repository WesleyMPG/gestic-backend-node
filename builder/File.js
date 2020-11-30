const GenericBuilder = require("./GenericBuilder");

class File extends GenericBuilder{
    constructor(){
        super();
        this.tableName = 'file';
        this.dictionary = [
            ['id','file_id'],
            ['tag','file_tag'],
            ['name','file_name'],
            ['ref','file_ref']
        ];
    }

}

module.exports = File;