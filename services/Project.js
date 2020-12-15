require('dotenv/config');

const ProjectRepository = require('../repository/Project')
const UserService = require("../services/User")

class Project {
    constructor() {
        this.projectRepository = new ProjectRepository();
        this.userService = new UserService();

    }

    insertProject = async ({
        name,
        description,
        userId
    }) => {
        try {
            const user = await this.userService.getUserById({ id: userId });
            if (!user || (user.tag != 'COOR' && user.tag != 'PROF')) {
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
    getProjects = async () => {
        try {
            const projects = await this.projectRepository.getRows();
            return projects;

        } catch (err) {
            throw err;
        }
    }

    updateProject = async ({
        id,
        name,
        description,
        userId

    }) => {
        try {
            if (userId) {
                const user = await this.userService.getUserById({ id: userId });
                if (!user || (user.tag != 'COOR' && user.tag != 'PROF')) {
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
        id
    }) => {
        try {
            const deletedProject = await this.projectRepository.deleteRow({id});
            return deletedProject;
        } catch (err) {
            throw err;
        }
    }

    getProjectById = async ({
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