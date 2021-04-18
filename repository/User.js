const GenericRepository = require("./GenericRepository");
const UserBuilder = require('../builder/User')

class User extends GenericRepository {
    constructor () {
        super(new UserBuilder());
    }
}

module.exports = User;
