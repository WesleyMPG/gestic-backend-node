require('dotenv/config');

const ClassGroupRepository = require('../repository/ClassGroup');
const UserService = require('./User');

class ClassGroup {
    constructor() {
        this.classGroupRepository = new ClassGroupRepository();
        this.usersService = new UserService();
    }

    insertClassGroup = async ({
        token,
        name,
        code,
        codeClassroom,
        linkClassroom,
        linkMeets,
        linkWpp,
        linkTel
    }) => {
        try {

            if (!(await this.usersService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            const insertedClassGroup = await this.classGroupRepository.insertRow({
                name,
                code,
                codeClassroom,
                linkClassroom,
                linkMeets,
                linkWpp,
                linkTel
            });
            return insertedClassGroup;
        } catch (err) {
            throw err;
        }
    }

    getClassGroups = async (
        token
    ) => {
        try {
            const classGroups = await this.classGroupRepository.getRows();
            return classGroups;
        } catch (err) {
            throw err;
        }
    }

    getClassGroupById = async ({
        id
    }) => {
        try {
            const classGroup = await this.classGroupRepository.getRow({ id });
            return classGroup;
        } catch (err) {
            throw err;
        }
    }

    updateClassGroup = async ({
        token,
        id,
        name,
        code,
        codeClassroom,
        linkClassroom,
        linkMeets,
        linkWpp,
        linkTel

    }) => {
        try {

            if (!(await this.usersService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            const classGroup = await this.getClassGroupById({ id });
            if (!classGroup) {
                throw new Error('Invalid Id')
            }
            const updatedClassGroup = await this.classGroupRepository.updateRow(
                { id },
                {
                    name,
                    code,
                    codeClassroom,
                    linkClassroom,
                    linkMeets,
                    linkWpp,
                    linkTel
                }
            );
            return updatedClassGroup;
        } catch (err) {
            throw err;
        }
    }

    deleteClassGroupById = async ({
        token,
        id
    }) => {
        try {

            if (!(await this.usersService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            const deletedClassGroup = await this.classGroupRepository.deleteRow({ id });
            return deletedClassGroup;
        } catch (err) {
            throw err;
        }
    }

    deleteClassGroups = async (
        token
    ) => {
        try {

            if (!(await this.usersService.validateUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] }))) throw new Error('Invalid Profile.');

            const deletedClassGroups = await this.classGroupRepository.deleteRows({});
            return deletedClassGroups;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ClassGroup;