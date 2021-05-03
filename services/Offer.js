require('dotenv/config');

const OfferRepository = require('../repository/Offer');
const UserService = require('./User');

class Offer {
    constructor() {
        this.offerRepository = new OfferRepository();
        this.userService = new UserService();
    }

    insertOffer = async ({
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

            await this.userService.verifyUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] });

            const insertedOffer = await this.offerRepository.insertRow({
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
            const offers = await this.offerRepository.getRows();
            return offers;
        } catch (err) {
            throw err;
        }
    }

    getOfferById = async ({
        id,
    }) => {
        try {
            const offer = await this.offerRepository.getRow({ id });
            return offer;
        } catch (err) {
            throw err;
        }
    }

    updateOffer = async ({
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

            await this.userService.verifyUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] });

            const offer = await this.getOfferById({ id });
            if (!offer) {
                throw new Error('Invalid Id')
            }
            const updatedOffer = await this.offerRepository.updateRow(
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
            return updatedOffer;
        } catch (err) {
            throw err;
        }
    }

    deleteOfferById = async ({
        token,
        id
    }) => {
        try {

            await this.userService.verifyUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] });

            const deletedOffer = await this.offerRepository.deleteRow({ id });
            return deletedOffer;
        } catch (err) {
            throw err;
        }
    }

    deleteOffers = async (
        token
    ) => {
        try {

            await this.userService.verifyUserProfile({token, validProfileTags: ['COOR', 'PROF', 'MONI'] });

            const deletedOffers = await this.offerRepository.deleteRows({});
            return deletedOffers;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Offer;
