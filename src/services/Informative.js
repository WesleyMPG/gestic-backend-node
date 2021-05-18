const UserService = require("./User")
const allowedProfiles = require('../config/permissions.json').project;
const db = require('../database/models')
const uuid = require('uuid');

class Informative {
    constructor() {
        this.userService = new UserService();
    }
    //TODO: fazer com que apenas quem criou possa editar ou remover
    insert = async ({
        token,
        title,
        content,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const info = await db.informative.create({
                id: uuid.v4(),
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
            const informatives = await db.informative.findAll();
            return informatives;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({ id }) => {
        try {
            const informative = await db.informative.findByPk(id);
            return informative;
        } catch (err) {
            throw err;
        }
    }

    update = async ({ 
        token,
        id,
        title = undefined,
        content = undefined,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            let informative = await db.informative.findByPk(id);

            if (!informative) throw new Error('Informative not found.');

            await db.informative.update({
                title: title ? title : informative.title,
                content: content ? content : informative.content,
            }, {
                where: { id },
            });
            informative = await db.informative.findByPk(id);
            return informative.get();
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedInformative = await db.informative.findByPk(id);
            deletedInformative.destroy();
            return deletedInformative;
        } catch (err) {
            throw (err);
        }
    }
}


module.exports = Informative;
