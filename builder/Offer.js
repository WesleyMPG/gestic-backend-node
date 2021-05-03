const GenericBuilder = require("./GenericBuilder");

class Offer extends GenericBuilder{
    constructor(){
        super();
        this.tableName = 'offer';
        this.dictionary = [
            ['id','offer_id'],
            ['name','offer_name'],
            ['code','offer_code'],
            ['codeClassroom','offer_code_classroom'],
            ['linkClassroom','offer_link_classroom'],
            ['linkMeets','offer_link_meets'],
            ['linkWpp','offer_link_wpp'],
            ['linkTel','offer_link_tel']
        ];
    }

}

module.exports = Offer;
