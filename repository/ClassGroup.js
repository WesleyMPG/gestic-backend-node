const GenericRepository = require("./GenericRepository");
const ClassGroupBuilder = require('../builder/ClassGroup');

class ClassGroup extends GenericRepository{
    constructor(){
        super(new ClassGroupBuilder())
    }
}

module.exports = ClassGroup;