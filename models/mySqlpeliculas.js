const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');

const peliculas = bdmysql.define('peliculas',
    {
        'id': {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        'nombre': {
            type: DataTypes.STRING,
            allowNull: false
        },

        'heroe': {
            type: DataTypes.STRING,
            allowNull: false
        },

        'protagonista': {
            type: DataTypes.STRING,
            allowNull: false
        }
    },

    {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
    }
);

module.exports = {
    peliculas,
};
