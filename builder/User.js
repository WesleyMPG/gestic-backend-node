const GenericBuilder = require("./GenericBuilder");

class User extends GenericBuilder {
    constructor() {
        super();
        this.tableName = 'users';
        this.dictionary = [
            ['id', 'user_id'],
            ['profileId', 'prof_id'],
            ['name', 'user_name'],
            ['cpf', 'user_cpf'],
            ['email', 'user_email'],
            ['password', 'user_password'],
            ['status', 'user_status']
        ];
    }
}

module.exports = User;