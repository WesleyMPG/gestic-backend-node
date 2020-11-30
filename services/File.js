require('dotenv/config');

const FileRepository = require('../repository/File');

class File {
    constructor() {
        this.fileRepository = new FileRepository();
    }

    insertFile = async ({
        name,
        tag,
        ref
    }) => {
        try {
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
        tag = null
    }) => {
        try{
            const files = await this.fileRepository.getRows({tag});
            return files;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = File;