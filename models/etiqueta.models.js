


const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const moment = require('moment');

const Etiqueta = sequelize.define('Etiqueta', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    titulo: { type: DataTypes.STRING, allowNull: false, },
    slug: { type: DataTypes.STRING, allowNull: false, },
    createdAt: { type: DataTypes.DATE, allowNull: true, default: Date.now },

}, {
    tableName: 'etiquetas', // Nombre de la tabla en snake_case
    timestamps: true,
    // Esto convierte los nombres de columnas de camelCase a snake_case
    underscored: true,
    // Esto convierte los nombres de modelos de pascalCase a snake_case
    freezeTableName: true,
});


module.exports = Etiqueta;


