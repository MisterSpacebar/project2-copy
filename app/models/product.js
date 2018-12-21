'use strict';

module.exports = function (sequelize, Sequelize) {

    var Product = sequelize.define('product', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        category: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        brand: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        price: {
            type: Sequelize.FLOAT,
            notEmpty: true
        },

        quantity: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }

    });

    Product.associate = function (models) {
        Product.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Product;

}