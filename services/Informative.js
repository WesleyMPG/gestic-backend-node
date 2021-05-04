const InformativeRepository = require('../repository/Informative');
const UserService = require('./User');
const allowedProfiles = require('../permissions.json').informative;


class Informative {
    constructor() {
        this.informativeRepository = new InformativeRepository();
        this.userService = new UserService();
    }

    insert = async ({
        token,
        title,
        content,
        userId,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const info = await this.informativeRepository.insertRow({
                title, content,});
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
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const informative = await this.getById({ id });

            if (!informative) throw new Error('Invalid informative');

            const updatedInformative = await this.informativeRepository.updateRow({ id }, { title, content });
            return updatedInformative;
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedInformative = await this.informativeRepository.deleteRow({ id });
            return deletedInformative;
        } catch (err) {
            throw (err);
        }
    }
}


module.exports = Informative;
