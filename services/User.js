require('dotenv/config');

const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/User');
const ProfileRepository = require('../repository/Profile');

class User {
    constructor() {
        this.userRepository = new UserRepository();
        this.profileRepository = new ProfileRepository();
    }

    login = async ({
        email,
        password
    }) => {
        try {
            const user = await this.userRepository.getRow({
                email,
                password
            })

            if (user) {
                const id = user.id;
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 900
                });
                return { auth: true, token: token };
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

            const createdUser = await this.userRepository.insertRow({
                profileId: profile.id,
                name,
                cpf,
                email,
                password
            });

            return createdUser;
        } catch (err) {
            throw err;
        }
    }

    getUserById = async ({
        id
    }) => {
        try {
            const user = await this.userRepository.getRow({ id });
            const profile = await this.profileRepository.getRow({ id:user.profileId });
            return {...user,tag:profile.tag,password:'*******'};
        } catch (err) {
            throw err;
        }
    }

}

module.exports = User;