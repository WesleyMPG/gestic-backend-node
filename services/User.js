require('dotenv/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserRepository = require('../repository/User');
const ProfileRepository = require('../repository/Profile');

class User {
    constructor() {
        this.userRepository = new UserRepository();
        this.profileRepository = new ProfileRepository();
    }

    _generateHash = async ({ password }) => {
        try {
            const salt = await bcrypt.genSalt();
            const passHash = await bcrypt.hash(password, salt);
            return passHash;
        } catch (err) {
            throw err
        }
    }

    _validatePassword = async ({ password, passHash }) => {
        return await bcrypt.compare(password, passHash)
    }

    validateUserProfile = async ({ token, validProfileTags = [] }) => {
        try {
            const { id, profileId } = await jwt.verify(token, process.env.SECRET);
            const profile = await this.profileRepository.getRow({ id: profileId });

            if (validProfileTags.find((prof) => prof === profile.tag)) return true;

            return false;

        } catch (err) {
            throw err
        }
    }

    login = async ({
        email,
        password
    }) => {
        try {
            const user = await this.userRepository.getRow({
                email
            })

            if (user && await this._validatePassword({ password, passHash: user.password }) && user.status) {
                const { id, profileId } = user;
                const token = jwt.sign({ id, profileId }, process.env.SECRET, {
                    expiresIn: 900
                });
                const profile = await this.profileRepository.getRow({ id: user.profileId });
                return { ...user, profileTag: profile.tag, auth: true, token: token, password: '*******' };
            } else {
                throw new Error('Invalid Login!');
            }
        } catch (err) {
            throw err
        }
    }

    register = async ({
        tag,
        name,
        cpf,
        email,
        password
    }) => {
        try {
            const profile = await this.profileRepository.getRow({ tag });

            if (!profile) throw new Error('Invalid tag.');

            let user;
            user = await this.userRepository.getRow({ email });
            if (user) throw new Error('Invalid email.')
            user = await this.userRepository.getRow({ cpf });
            if (user) throw new Error('Invalid CPF.')

            password = await this._generateHash({ password });

            const createdUser = await this.userRepository.insertRow({
                profileId: profile.id,
                name,
                cpf,
                email,
                password,
                status: false
            });

            return {
                ...createdUser,
                password: '*******',
                profileTag: tag
            };
        } catch (err) {
            throw err;
        }
    }

    getUserById = async ({
        token,
        id
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            const profile = await this.profileRepository.getRow({ id: user.profileId });
            return { ...user, profileTag: profile.tag, password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    getListOfUsers = async ({
        token,
        status = undefined,
    }) => {
        try {

            if (!(await this.validateUserProfile({ token, validProfileTags: ['COOR', 'MONI'] }))) throw new Error('Invalid Profile.');
            let users;
            if (status === undefined) {
                users = await this.userRepository.getRows();
            }
            else {
                users = await this.userRepository.getRows({ status });
            }
            return users.map(user => ({ ...user, password: '*******' }));
        } catch (err) {
            throw err;
        }
    }

    updateUser = async ({
        token,
        id,
        name,
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            if (!user) throw new Error('User not found.');
            const updatedUser = await this.userRepository.updateRow({ id }, { name });
            return { ...updatedUser, password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    approveUserById = async ({
        token,
        id
    }) => {
        try {

            if (!(await this.validateUserProfile({ token, validProfileTags: ['COOR', 'MONI'] }))) throw new Error('Invalid Profile.');

            const user = await this.userRepository.getRow({ id });
            if (!user) throw new Error('User not found.');
            const approvedUser = await this.userRepository.updateRow({ id }, { status: true });
            return { ...approvedUser, password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    approveMultipleUsersById = async ({
        token,
        ids
    }) => {
        try {

            if (!(await this.validateUserProfile({ token, validProfileTags: ['COOR', 'MONI'] }))) throw new Error('Invalid Profile.');

            let users = [];
            let tempUser;
            for (const id of ids) {
                try {
                    tempUser = await this.approveUserById({ id, token });
                    users.push(tempUser);
                } catch (err) { }
            }
            return users;
        } catch (err) {
            throw err;
        }
    }

    deleteUserById = async ({
        token,
        id
    }) => {
        try {
            if (!(await this.validateUserProfile({ token, validProfileTags: ['COOR', 'MONI'] }))) throw new Error('Invalid Profile.');
            const user = await this.userRepository.getRow({ id });
            if (!user) throw new Error('Invalid Id.')

            const deletedUser = await this.userRepository.deleteRow({ id });

            return { ...deletedUser, password: '*******' }
        } catch (err) {
            throw err;
        }
    }

}

module.exports = User;