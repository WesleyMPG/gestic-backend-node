const GenericRepository = require("./GenericRepository");
const ProfileBuilder = require('../builder/Profile')

class Profile extends GenericRepository {
    constructor () {
        super(new ProfileBuilder())
    }

    
}

module.exports = Profile;
