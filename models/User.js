'use strict';
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'user_id'
        },
        profileId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: 'prof_id'
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'user_name'
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'user_email'
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'user_password'
        },
        status: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            field: 'user_status',
            defaultValue: true
        },
        change_psswd: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    }, {
        timestamps: true
    })

    User.associate = (models) => {
        User.hasOne(models.profile, { foreignKey: 'id' })
    }

    return User;
}
