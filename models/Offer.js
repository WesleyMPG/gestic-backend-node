'use strict';
module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define('offer', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            field: 'offer_id'
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'offer_name'
        },
        code: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'offer_code'
        },
        codeClassroom: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '#',
            field: 'offer_code_classroom'
        },
        linkClassroom: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '#',
            field: 'offer_link_classroom'
        },
        linkMeets: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '#',
            field: 'offer_link_meets'
        },
        linkWpp: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '#',
            field: 'offer_link_wpp'
        },
        linkTel: {
            allowNull: false,
            type: Sequelize.STRING,
            defaultValue: '#',
            field: 'offer_link_tel'
        },
    }, {
        timestamps: true
    })

    return Offer;
}
