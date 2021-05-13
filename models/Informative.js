'use strict';
module.exports = (sequelize, Sequelize) => {
    const Informative = sequelize.define('informative', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            field: 'info_id'
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'info_title',
        },
        content: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'info_content',
        },
    }, {
        timestamps: true
    })

    return Informative;
}
