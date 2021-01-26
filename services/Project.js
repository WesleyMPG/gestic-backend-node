require('dotenv/config');

const ProjectRepository = require('../repository/Project')
const UserService = require("./User")

class Project {
    constructor() {
        this.projectRepository = new ProjectRepository();
        this.userService = new UserService();

    }

    insertProject = async ({
        token,
        name,
        description,
        userId
    }) => {
        try {

            if (!(await this.userService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            const user = await this.userService.getUserById({ id: userId });
            if (!user || (user.profileTag != 'COOR' && user.profileTag != 'PROF')) {
                throw new Error('Invalid user');
            }

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
    getProjects = async (token) => {
        try {
            const projects = await this.projectRepository.getRows();
            return projects;

        } catch (err) {
            throw err;
        }
    }

    updateProject = async ({
        token,
        id,
        name,
        description,
        userId

    }) => {
        try {

            if (!(await this.userService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            if (userId) {
                const user = await this.userService.getUserById({ id: userId });
                if (!user || (user.profileTag != 'COOR' && user.profileTag != 'PROF')) {
                    throw new Error('Invalid user');
                }
            }
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

    deleteProject = async ({
        token,
        id
    }) => {

        if (!(await this.userService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

        try {
            const deletedProject = await this.projectRepository.deleteRow({id});
            return deletedProject;
        } catch (err) {
            throw err;
        }
    }

    getProjectById = async ({
        token,
        id
    }) => {
        try {            
            const selectedProject = await this.projectRepository.getRow({id});
            return selectedProject;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = Project;