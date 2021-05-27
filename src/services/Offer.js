require('dotenv/config');

const UserService = require('./User');
const db = require('../database/models')
const allwdProf = require('../config/permissions.json').offer;
const { UUID } = require('sequelize');
const uuid = require('uuid');

class Offer {
    constructor() {
        this.userService = new UserService();
    }

    insert = async ({
        token,
        ownerId,
        name,
        code,
        codeClassroom,
        linkClassroom,
        linkMeets,
        linkWpp,
        linkTel
    }) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allwdProf.create });

            const insertedOffer = await db.offer.create({
                id: uuid.v4(),
                owner: ownerId,
                name,
                code,
                codeClassroom,
                linkClassroom,
                linkMeets,
                linkWpp,
                linkTel
            });
            return insertedOffer;
        } catch (err) {
            throw err;
        }
    }

    getOffers = async (
    ) => {
        try {
            const offers = await db.offer.findAll();
            return offers;
        } catch (err) {
            throw err;
        }
    }

    getById = async ({
        id,
    }) => {
        try {
            const offer = await db.offer.findByPk(id);
            if (!offer) throw new Error('Offer Not found.');
            return offer;
        } catch (err) {
            throw err;
        }
    }

    update = async ({
        token,
        id,
        userId,
        name = undefined,
        code = undefined,
        codeClassroom = undefined,
        linkClassroom = undefined,
        linkMeets = undefined,
        linkWpp = undefined,
        linkTel = undefined

    }) => {
        try {
            let offer = await db.offer.findByPk(id);
            if (!offer) throw new Error('Invalid Id');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (userId !== offer.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            await db.offer.update(
                {
                    name: name ? name : offer.name,
                    code: code ? code : offer.code,
                    codeClassroom: codeClassroom ? codeClassroom : offer.codeClassroom,
                    linkClassroom: linkClassroom ? linkClassroom : offer.linkClassroom,
                    linkMeets: linkMeets ? linkMeets : offer.linkMeets,
                    linkWpp: linkWpp ? linkWpp : offer.linkWpp,
                    linkTel: linkTel ? linkTel : offer.linkTel,
                }, {
                    where: { id }
                }
            );
            offer = await db.offer.findByPk(id);
            return offer;
        } catch (err) {
            throw err;
        }
    }

    deleteById = async ({
        token,
        id,
        userId
    }) => {
        try {
            const offer = await db.offer.findByPk(id);
            if (!offer) throw new Error('Invalid Id');

            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            if (userId !== offer.owner && !isAdmin) 
                throw new Error('You have no permission to do this.');

            await offer.destroy()
            return offer.get();
        } catch (err) {
            throw err;
        }
    }

    deleteOffers = async (
        token
    ) => {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: allwdProf.deleteAll });

            const offers = await db.offer.findAll();
            for (let i = 0; i < offers.length; ++i) {
                await offers[i].destroy()
            }
            return offers;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Offer;
