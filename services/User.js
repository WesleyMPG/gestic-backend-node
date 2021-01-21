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
                return { ...user, auth: true, token: token, password: '*******' };
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
                password: '*******'
            };
        } catch (err) {
            throw err;
        }
    }

    getUserById = async ({
        id
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            const profile = await this.profileRepository.getRow({ id: user.profileId });
            return { ...user, tag: profile.tag, password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    getListOfUsersByStatus = async () => {
        try {
            const users = await this.userRepository.getRows({ status: false });
            return users.map(user => ({ ...user, password: '*******' }));
        } catch (err) {
            throw err;
        }
    }

    updateUser = async ({
        id,
        name,
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            if (!user) throw new Error('User not found.');
            const updatedUser = await this.userRepository.updateRow({ id }, { name });
            return {...updatedUser, password: '*******'};
        } catch (err) {
            throw err;
        }
    }

    approveUserById = async ({
        id
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            if (!user) throw new Error('User not found.');
            const approvedUser = await this.userRepository.updateRow({ id }, { status: true });
            return {...approvedUser, password: '*******'};
        } catch (err) {
            throw err;
        }
    }

    approveMultipleUsersById = async ({
        ids
    }) => {
        try {
            let users = [];
            let tempUser;
            for (const id of ids) {
                try {
                    tempUser = await this.approveUserById({ id });
                    users.push(tempUser);
                } catch (err) { }
            }
            return users;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = User;