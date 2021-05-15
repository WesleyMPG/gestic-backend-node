require('dotenv/config');

const UserService = require("./User")
const allowedProfiles = require('../permissions.json').project;
const db = require('../models')
const uuid = require('uuid');

class Project {
    constructor() {
        this.userService = new UserService();
    }

    insert = async ({
        token,
        name,
        description,
        userId
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('Invalid user.');
            const project = await db.project.create({
                id: uuid.v4(),
                name,
                description,
                userId
            });
            return project.get();
        } catch (err) {
            throw err;
        }
    }

    getProjects = async () => {
        try {
            const projects = await db.project.findAll();
            return projects;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({
        id
    }) => {
        try {
            const selectedProject = await db.project.findByPk(id);
            if (!selectedProject) throw new Error('Project not found.');
            return selectedProject.get();
        } catch (err) {
            throw err;
        }
    }

    update = async ({
        token,
        id,
        name = undefined,
        description = undefined,
        userId = undefined,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });

            let project = await db.project.findByPk(id);
            if (!project) throw new Error('Project not found.');

            await db.project.update(
                {
                    name: name ? name : project.name,
                    description: description ? description : project.description,
                    userId: userId ? userId : project.userId,
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

    delete = async ({ token,id }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedProject = await db.project.findByPk(id);
            await deletedProject.destroy();
            return deletedProject.get();
        } catch (err) {
            throw err;
        }
    }

}


module.exports = Project;
