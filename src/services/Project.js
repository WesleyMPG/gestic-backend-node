require('dotenv/config');

const UserService = require("./User")
const allwdProf = require('../config/permissions.json').project;
const db = require('../database/models')
const uuid = require('uuid');

class Project {
    constructor() {
        this.userService = new UserService();
    }

    insert = async ({
        token,
        ownerId,
        name,
        description,
        type,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allwdProf.create });

            const user = await db.user.findByPk(ownerId);
            if (!user) throw new Error('Invalid user.');
            const project = await db.project.create({
                id: uuid.v4(),
                owner: ownerId,
                name,
                description,
                type,
            });
            return project.get();
        } catch (err) {
            throw err;
        }
    }

    getProjects = async ({ type = undefined }) => {
        try {
            let projects;
            if (type) {
                projects = await db.project.findAll({
                    where: { type }
                })
            } else {
                projects = await db.project.findAll();
            }
            return projects;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({
        id
    }) => {
        try {
            const selectedProject = await db.project.findByPk(id, {
                include: { 
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            if (!selectedProject) throw new Error('Project not found.');
            return selectedProject.get();
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
        type = undefined,
    }) => {
        try {
            let project = await db.project.findByPk(id);
            if (!project) throw new Error('Project not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== project.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            await db.project.update(
                {
                    owner: newOwner ? newOwner : ownerId,
                    name: name ? name : project.name,
                    description: description ? description : project.description,
                    type: type ? type : project.type,
                },
                {
                    where: {
                        id
                    }
                }
            );
            project = await db.project.findByPk(id);
            return project.get();
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id, ownerId }) => {
        try {
            let project = await db.project.findByPk(id);
            if (!project) throw new Error('Project not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== project.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            await project.destroy();
            return project.get();
        } catch (err) {
            throw err;
        }
    }

    insertMember = async ({ token, id, userId, ownerId })  => {
        try {
            let project = await db.project.findByPk(id);
            if (!project) throw new Error('Project not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== project.owner && !isAdmin)
                throw new Error('You have no permission to do this.');

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');
            await project.addMember(user);
            project = await db.project.findByPk(id, {
                include: { 
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return project;
        } catch (err) {
            throw err;
        }
    }

    deleteMember = async ({token, id, userId, ownerId}) => {
        try {
            let project = await db.project.findByPk(id);
            if (!project) throw new Error('Project not found.');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (ownerId !== project.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');
            await project.removeMember(user);
            project = await db.project.findByPk(id, {
                include: { 
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return project;
        } catch (err) {
            throw err;
        }
    }

}


module.exports = Project;
