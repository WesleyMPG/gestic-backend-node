const InformativeRepository = require('../repository/Informative');
const UserService = require('./User')

class Informative {
    constructor() {
        this.informativeRepository = new InformativeRepository();
        this.userService = new UserService();
    }

    // TODO: adicionar possibilidade de fazer upload de arquivos
    insert = async ({
        token,
        title,
        content,
        userId,
    }) => {
        try {
            if (!(await this.userService.validateUserProfile(
                { token,
                  validProfileTags: ['TEC', 'COOR', 'PROF'] }))
            ) throw new Error('Invalid profile.');

            const user = await this.userService.getUserById({ id: userId });
            if (!user) throw new Error('Invalid user.');

            const info = await this.informativeRepository.insertRow({
                title,
                content,
            });
            return info;
        } catch (err) {
            throw err;
        }
    }

    get = async () => {
        try {
            const informatives = await this.informativeRepository.getRows();
            return informatives;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({ id }) => {
        try {
            const informative = await this.informativeRepository.getRow({ id });
            return informative;
        } catch (err) {
            throw err;
        }
    }

    update = async ({ token, id, title, content }) => {
        try {
            if (!(await this.userService.validateUserProfile({
                token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))
            ) throw new Error('Invalid Profile.');

            const informative = await this.getById({ id });

            if (!informative) throw new Error('Invalid Id');

            const updatedInformative = await this.informativeRepository.updateRow({ id }, { title, content });
            return updatedInformative;
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id }) => {
        try {
            if (!(await this.userService.validateUserProfile({
                token, validProfileTags: ['COOR', 'PROF']}))
            ) throw new Error('Invalid Profile');

            const deletedInformative = await this.informativeRepository.deleteRow({ id });
            return deletedInformative;
        } catch (err) {
            throw (err);
        }
    }

}


module.exports = Informative;
