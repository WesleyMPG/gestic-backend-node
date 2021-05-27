const UserService = require('./User');
const allwdProf = require('../config/permissions.json').researchGroup;
const db = require('../database/models');
const uuid = require('uuid');

class ResearchGroup {
    constructor() {
        this.userService = new UserService();
    }

    insert = async ({
        token,
        ownerId,
        name,
        description,
        activities,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allwdProf.create });
            const group = await db.research.create({
                id: uuid.v4(),
                owner: ownerId,
                name,
                description,
                activities});
            return group;
        } catch (err) {
            throw err;
        }
    }

    getGroups = async () => {
        try {
            const groups = await db.research.findAll();
            return groups;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({ id }) => {
        try {
            const group = await db.research.findByPk(id, {
                include: { 
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            if (!group) throw new Error('Research group not found.');
            return group;
        } catch (err) {
            throw err;
        }
    }

    update = async ({
        token,
        id,
        ownerId,
        newOwner = undefined,
        name = undefined,
        description = undefined,
        activities = undefined,
    }) => {
        try {
            let research = await db.research.findByPk(id);
            if (!research) throw new Error('Research not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== research.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            await db.research.update({
                owner: newOwner ? newOwner : ownerId,
                name: name ? name : research.name,
                description: description ? description : research.description,
                atctivities: activities ? activities : research.activities,
            },
            {
                where: { id }
            });
            research = await db.research.findByPk(id);
            return research;
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id, ownerId }) => {
        try {
            const research = await db.research.findByPk(id);
            if (!research) throw new Error('Research not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== research.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            await research.destroy();
            return research.get();
        } catch (err) {
            throw err;
        }
    }

    insertMember = async ({ token, id, userId, ownerId})  => {
        try {
            let research = await db.research.findByPk(id);
            if (!research) throw new Error('Research not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== research.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');

            await research.addMember(user);
            research = await db.research.findByPk(id, {
                include: { 
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return research;
        } catch (err) {
            throw err;
        }
    }

    deleteMember = async ({token, id, userId, ownerId}) => {
        try {
            let research = await db.research.findByPk(id);
            if (!research) throw new Error('Research not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== research.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');

            await research.removeMember(user);
            research = await db.research.findByPk(id, {
                include: { 
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return research;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = ResearchGroup;