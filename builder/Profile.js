const GenericBuilder = require("./GenericBuilder");

class Profile extends GenericBuilder {
    constructor () {
        super();
        this.tableName = 'profiles';
        this.dictionary = [
            ['id', 'prof_id'],
            ['tag','prof_tag'],
            ['name', 'prof_name']
        ];
    }
}

module.exports = Profile;