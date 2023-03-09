'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.removeColumn('Collections', 'createdAt');
        await queryInterface.removeColumn('Collections', 'updatedAt');
        await queryInterface.removeColumn('Entities', 'createdAt');
        await queryInterface.removeColumn('Entities', 'updatedAt');
        await queryInterface.removeColumn('Fields', 'createdAt');
        await queryInterface.removeColumn('Fields', 'updatedAt');
        await queryInterface.removeColumn('ContentTypes', 'createdAt');
        await queryInterface.removeColumn('ContentTypes', 'updatedAt');
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.addColumn('Collections', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('Collections', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('Entities', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('Entities', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('Fields', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('Fields', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('ContentTypes', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
        await queryInterface.addColumn('ContentTypes', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: true
        });
    }
};
