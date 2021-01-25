require('dotenv/config');

const FileRepository = require('../repository/File');

class File {
    constructor() {
        this.fileRepository = new FileRepository();
    }

    insertFile = async ({
        token,
        name,
        tag,
        ref
    }) => {
        try {

            if (!(await this.usersService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

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

            if (!(await this.usersService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');
            
            const files = await this.fileRepository.getRows({tag});
            return files;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = File;