// TODO: registar no index do modulo
const ResearchGroupRepository = require('../repository/Research');
const UserService = require('./User');
const allowedProfiles = require('../permissions.json');

class ResearchGroup {
    constructor() {
        this.groupRepository = new ResearchGroupRepository();
        this.userService = new UserService();
    }

    insert = async ({
        token,
        name,
        description,
        members,
        atctivities,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const group = await this.groupRepository.insertRow({
                name, description, members, atctivities });
            return group;
        } catch (err) {
            throw err;
        }
    }

    getGroups = async () => {
        try {
            const groups = await this.groupRepository.getRows();
            return groups;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({ id }) => {
        try {
            const group = await this.groupRepository.getRow({ id });
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
        members,
        atctivities,
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const updatedGroup = await this.groupRepository.updateRow(
                { id }, { name, description, members, atctivities}
            );
            return updatedGroup;
        } catch (err) {
            throw err;
        }
    }

    delete = async ({ token, id }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedGroup = await this.groupRepository.deleteRow({
                id });
            return deletedGroup;
        } catch (err) {
            throw err;
        }
    }
}
