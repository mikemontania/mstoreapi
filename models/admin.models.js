const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const moment = require('moment');

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    nombres: { type: DataTypes.STRING, allowNull: false, },
    apellidos: { type: DataTypes.STRING, allowNull: false, },
    email: { type: DataTypes.STRING, allowNull: false, },
    password: { type: DataTypes.STRING, allowNull: false, },
    img: { type: DataTypes.STRING, allowNull: true, default: 'perfil.png' },
    rol: { type: DataTypes.STRING, allowNull: true, },
    createdAt: { type: DataTypes.DATE, allowNull: true, default: Date.now },
    updatedAt: { type: DataTypes.DATE, allowNull: true, default: Date.now }
}, {
    tableName: 'admins', // Nombre de la tabla en snake_case
    timestamps: true,
    // Esto convierte los nombres de columnas de camelCase a snake_case
    underscored: true,
    // Esto convierte los nombres de modelos de pascalCase a snake_case
    freezeTableName: true,
});


module.exports = Admin;