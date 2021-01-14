require('dotenv/config');

const ClassGroupRepository = require('../repository/ClassGroup');

class ClassGroup {
    constructor() {
        this.classGroupRepository = new ClassGroupRepository();
    }

    insertClassGroup = async ({
        name,
        code,
        codeClassroom,
        linkClassroom,
        linkMeets,
        linkWpp,
        linkTel
    }) => {
        try {
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
        id
    }) => {
        try {
            const deletedClassGroup = await this.classGroupRepository.deleteRow({ id });
            return deletedClassGroup;
        } catch (err) {
            throw err;
        }
    }

    deleteClassGroups = async () => {
        try {
            const deletedClassGroups = await this.classGroupRepository.deleteRows({});
            return deletedClassGroups;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ClassGroup;