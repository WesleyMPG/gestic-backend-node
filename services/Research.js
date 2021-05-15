const UserService = require('./User');
const allowedProfiles = require('../permissions.json').researchGroup;
const db = require('../models');
const uuid = require('uuid');

class ResearchGroup {
    constructor() {
        this.userService = new UserService();
    }

    insert = async ({
        token,
        name,
        description,
        activities,
        members = undefined,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const group = await db.research.create({
                id: uuid.v4(),
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
        name = undefined,
        description = undefined,
        activities = undefined,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            let group = await db.research.findByPk(id);
            if (!group) throw new Error('Research group no found.');
            await db.research.update({
                name: name ? name : group.name,
                description: description ? description : group.description,
                atctivities: activities ? activities : group.activities,
            },
            {
                where: { id }
            });
            group = await db.research.findByPk(id);
            return group;
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedGroup = await db.research.findByPk(id);
            await deletedGroup.destroy();
            return deletedGroup.get();
        } catch (err) {
            throw err;
        }
    }

    insertMember = async ({ token, id, userId})  => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            let research = await db.research.findByPk(id);
            if (!research) throw new Error('Research group no found.');

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');

            await research.addMember(user, { through: { r_members_id: uuid.v4() }});
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

    deleteMember = async ({token, id, userId}) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            let research = await db.research.findByPk(id);
            if (!research) throw new Error('Research not found.');

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