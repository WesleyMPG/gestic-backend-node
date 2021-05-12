'use strict';
module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            field: 'proj_id'
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: 'proj_user'
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'proj_name'
        },
        description: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'proj_description'
        },
    }, {
        timestamps: true
    })

    Project.associate = (models) => {
        Project.hasOne(models.user, { foreignKey: 'id' })
    }

    return Project;
}
