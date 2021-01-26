require('dotenv/config');


const FileRepository = require('../repository/File');
const UserService = require('./User');

class File {
    constructor() {
        this.fileRepository = new FileRepository();
        this.userService = new UserService();
    }

    insertFile = async ({
        token,
        name,
        tag,
        ref
    }) => {
        try {

            if (!(await this.userService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            const insertedFile = await this.fileRepository.insertRow({
                name,
                tag,
                ref
            });

            return insertedFile;
        } catch (err) {
            throw err;
        }
    }

    getFiles = async ({
        token,
        tag = null
    }) => {
        try{

            if (!(await this.userService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');
            
            const files = await this.fileRepository.getRows({tag});
            return files;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = File;