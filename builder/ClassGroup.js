const GenericBuilder = require("./GenericBuilder");

class ClassGroup extends GenericBuilder{
    constructor(){
        super();
        this.tableName = 'class_group';
        this.dictionary = [
            ['id','group_id'],
            ['name','group_name'],
            ['code','group_code'],
            ['codeClassroom','group_code_classroom'],
            ['linkClassroom','group_link_classroom'],
            ['linkMeets','group_link_meets'],
            ['linkWpp','group_link_wpp'],
            ['linkTel','group_link_tel']
        ];
    }

}

module.exports = ClassGroup;