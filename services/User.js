require('dotenv/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const allowedProfiles = require('../permissions.json').user;
const uuid = require('uuid');

const db = require('../models')


// TODO: verificar se as funcionalidades estão de acordo
// com o que será preciso
class User {

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
            const user = await db.user.findByPk(id);
            const profile = await db.profile.findByPk(profileId);

            if (!user) return false;
            if (validProfileTags.find((prof) => prof === profile.tag)) return true;

            return false;

        } catch (err) {
            throw err
        }
    }

    verifyUserProfile = async ({ token, validProfileTags = [] }) => {
        if (!(await this.validateUserProfile({
                token, validProfileTags }))) {
            throw new Error('Invalid user or profile.');
        }
    }

    login = async ({
        email,
        password
    }) => {
        try {
            const user = await db.user.findOne({
                where: {
                    email
                }
            })

            if (user && await this._validatePassword({ password, passHash: user.password }) && user.status) {
                const { id, profileId } = user;
                const profile = await db.profile.findByPk(user.profileId);
                const token = jwt.sign({ id, profileId }, process.env.SECRET, {
                    expiresIn: 900  // seconds
                });
                return { ...user.get(), profileTag: profile.tag, 
                            auth: true, password: '*******', token };
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
            const profile = await db.profile.findOne({
                where: {
                    tag: 'ALUN'
                }
            });
            if (!profile) throw new Error('Invalid tag.');

            const user = await db.user.findOne({
                where: {
                    email
                }
            });

            if (user) throw new Error('Invalid email.')

            password = await this._generateHash({ password });
            const createdUser = await db.user.create({
                id: uuid.v4(),
                profileId: profile.id,
                name,
                email,
                password,
                status: true
            });

            return {
                ...createdUser.get(),
                password: '*******',
                profileTag: 'ALUN'
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
            const user = await db.user.findByPk(id);
            const profile = await db.profile.findByPk(user.profileId);
            if (!user) throw new Error('User not found.');
            return { ...user.get(), profileTag: profile.tag, password: '*******' };
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
                users = await db.user.findAll();
            }
            else {
                users = await db.user.findAll({ 
                    where: { status }
                });
            }
            return users.map(user => ({ ...user, password: '*******' }));
        } catch (err) {
            throw err;
        }
    }

    update = async ({
        token,
        id,
        name = undefined,
        status = undefined,
        profileId = undefined,
        chang_psswd = undefined,
    }) => {
        // TODO: modificar todas as funções de update para que
        // updateRow aceite uma quantidade variavel de campos
        try {
            await this.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            let user = await db.user.findByPk(id);
            if (!user) throw new Error('User not found.');
            await db.user.update({ 
                name: name ? name : user.name,
                status: status ? status : user.status,
                profileId: profileId ? profileId : user.profileId,
                change_psswd: change_psswd ? chang_psswd : user.chang_psswd
            }, {
                where: {
                    id
                }
            });
            user = await db.user.findByPk(id);
            return { ...user.get(), password: '*******' };
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
            const user = await db.user.findByPk(id);
            if (!user) throw new Error('Invalid Id.')

            await user.destroy()

            return { ...user.get() }
        } catch (err) {
            throw err;
        }
    }

}

module.exports = User;
