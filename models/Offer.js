'use strict';
module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define('offer', {
        offer_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
        },
        offer_name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        offer_code: {
            allowNull: false,
            type: Sequelize.STRING
        },
        offer_code_classroom: {
            allowNull: false,
            type: Sequelize.STRING
        },
        offer_link_classroom: {
            allowNull: false,
            type: Sequelize.STRING
        },
        offer_link_meets: {
            allowNull: false,
            type: Sequelize.STRING
        },
        offer_link_wpp: {
            allowNull: false,
            type: Sequelize.STRING
        },
        offer_link_tel: {
            allowNull: false,
            type: Sequelize.STRING
        },
    }, {
        timestamps: true
    })

    return Offer;
}
