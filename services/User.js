require('dotenv/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const UserRepository = require('../repository/User');
const ProfileRepository = require('../repository/Profile');
const allowedProfiles = require('../permissions.json').user;


// TODO: verificar se as funcionalidades estão de acordo
// com o que será preciso
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
        return await bcrypt.compare(password, passHash);
    }

    validateUserProfile = async ({ token, validProfileTags = [] }) => {
        try {
            const { id, profileId } = await jwt.verify(token, process.env.SECRET);
            const user = await this.userRepository.getRow({ id });
            const profile = await this.profileRepository.getRow({
                id: profileId });

            if (!user) return false;
            if (validProfileTags.find((prof) => prof === profile.tag)) return true;

            return false;

        } catch (err) {
            throw err
        }
    }

    verifyUserProfile = async ({ token, validProfileTags = [] }) => {
        if (!(await this.validateUserProfile({
            token, validProfileTags }))){
            throw new Error('Invalid user or profile.');
        }
    }

    login = async ({
        email,
        password
    }) => {
        try {
            const user = await this.userRepository.getRow({
                email
            });

            if (user && await this._validatePassword({ password, passHash: user.password }) && user.status) {
                const { id, profileId } = user;
                const profile = await this.profileRepository.getRow({ id: user.profileId });
                const token = jwt.sign({ id, profileId }, process.env.SECRET, {
                    expiresIn: 900  // seconds
                });
                return { ...user, profileTag: profile.tag, auth: true, password: '*******', token };
            } else {
                throw new Error('Invalid Login!');
            }
        } catch (err) {
            throw err
        }
    }

    register = async ({
        name,
        email,
        password,
    }) => {
        try {
            const tag = 'ALUN';
            const profile = await this.profileRepository.getRow({ tag });
            if (!profile) throw new Error('Invalid tag.');

            let user = await this.userRepository.getRow({ email });
            if (user) throw new Error('Invalid email.')

            password = await this._generateHash({ password });

            const createdUser = await this.userRepository.insertRow({
                profileId: profile.id,
                name,
                email,
                password,
                status: true
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

    getById = async ({
        token,
        id
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            const profile = await this.profileRepository.getRow({ id: user.profileId });
            if (!user) throw new Error('Invalid id.')
            return { ...user, profileTag: profile.tag, password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    getUsers = async ({
        token,
        status = undefined,
    }) => {
        try {

            await this.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
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

    update = async ({
        token,
        id,
        name,
        status,
        profileId = undefined,
    }) => {
        // TODO: modificar todas as funções de update para que
        // updateRow aceite uma quantidade variavel de campos
        try {
            const user = await this.userRepository.getRow({ id });
            if (!user) throw new Error('User not found.');
            if (profileId){
                const profile = this.profileRepository.getRow({profileId});
                if (!profile) throw new Error('Invalid Profile');
            } else {
                profileId = user.profileId
            }
            const updatedUser = await this.userRepository.updateRow({ id }, { name });
            return { ...updatedUser, password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    deleteById = async ({
        token,
        id
    }) => {
        try {
            await this.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const deletedUser = await this.userRepository.deleteRow({ id });
            if (!deletedUser) throw new Error('Invalid Id.');

            return { ...deletedUser, password: '*******' }
        } catch (err) {
            throw err;
        }
    }

}

module.exports = User;
