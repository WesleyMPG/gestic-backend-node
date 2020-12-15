const GenericRepository = require("./GenericRepository");
const ProjectBuilder = require('../builder/Project');

class Project extends GenericRepository{
    constructor(){
        super(new ProjectBuilder())
    }
}

module.exports = Project;