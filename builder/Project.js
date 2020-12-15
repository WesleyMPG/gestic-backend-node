const GenericBuilder = require("./GenericBuilder");

class Project extends GenericBuilder {
    constructor () {
        super();
        this.tableName = 'project';
        this.dictionary = [
            ['id', 'proj_id'],
            ['userId','proj_user'],
            ['name', 'proj_name'],
            ['description','proj_description']
        ];
    }
}

module.exports = Project;