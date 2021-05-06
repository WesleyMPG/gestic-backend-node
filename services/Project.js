require('dotenv/config');

const ProjectRepository = require('../repository/Project');
const UserService = require("./User");
const allowedProfiles = require('../permissions.json').project;

class Project {
    constructor() {
        this.projectRepository = new ProjectRepository();
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
            const project = await this.projectRepository.insertRow({
                name,
                description,
                userId
            });
            return project;
        } catch (err) {
            throw err;
        }
    }

    getProjects = async () => {
        try {
            const projects = await this.projectRepository.getRows();
            return projects;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({
        id
    }) => {
        try {
            const selectedProject = await this.projectRepository.getRow({id});
            if (!selectedProject) throw new Error('Invalid id.');
            return selectedProject;
        } catch (err) {
            throw err;
        }
    }

    update = async ({
        token,
        id,
        name,
        description,
        userId
    }) => {
        try {

            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const updatedProject = await this.projectRepository.updateRow(
                { id },
                {
                    name,
                    description,
                    userId
                }
            );
            return updatedProject;
        } catch (err) {
            throw err;
        }
    }

    delete = async ({
        token,
        id
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedProject = await this.projectRepository.deleteRow({id});
            if (!deletedProject) throw new Error('Invalid id.');
            return deletedProject;
        } catch (err) {
            throw err;
        }
    }

}


module.exports = Project;
