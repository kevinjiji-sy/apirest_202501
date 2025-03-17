const { DataTypes } = require('sequelize');
const { bdmysql } = require('../database/MySqlConnection');
const { Heroes } = require('./mySqlHeroes'); 
const { peliculas } = require('./mySqlpeliculas'); 

const protagonistas = bdmysql.define('protagonistas', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idheroe: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Heroes,
            key: 'id'
        }
    },
    idpelicula: { 
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: peliculas,
            key: 'id'
        }
    },
    papel: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nombreActor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rol: {  
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, 
{
    // Maintain table name don't pluralize
    freezeTableName: true,

    // I don't want createdAt
    createdAt: false,

    // I don't want updatedAt
    updatedAt: false
});

protagonistas.belongsTo(Heroes, { foreignKey: 'idheroe' });
protagonistas.belongsTo(peliculas, { foreignKey: 'idpelicula' });

module.exports = { protagonistas };
