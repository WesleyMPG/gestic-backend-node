const UserService = require("./User")
const allwdProf = require('../config/permissions.json').informative;
const db = require('../database/models')
const uuid = require('uuid');

class Informative {
    constructor() {
        this.userService = new UserService();
    }

    insert = async ({
        token,
        ownerId,
        title,
        content,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allwdProf.create });
            const info = await db.informative.create({
                id: uuid.v4(),
                owner: ownerId,
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
        userId,
        title = undefined,
        content = undefined,
    }) => {
        try {
            let informative = await db.informative.findByPk(id);
            if (!informative) throw new Error('Informative not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (userId !== informative.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

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

    delete = async ({ token, id, userId }) => {
        try {
            const informative = await db.informative.findByPk(id);
            if (!informative) throw new Error('Informative not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (userId !== informative.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');
            informative.destroy();
            return informative;
        } catch (err) {
            throw (err);
        }
    }
}


module.exports = Informative;
