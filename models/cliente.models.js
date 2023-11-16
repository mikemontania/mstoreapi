const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const moment = require('moment');

const Cliente = sequelize.define('Cliente', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    dni: { type: DataTypes.STRING, allowNull: false, },
    nombres: { type: DataTypes.STRING, allowNull: false, },
    apellidos: { type: DataTypes.STRING, allowNull: false, },
    pais: { type: DataTypes.STRING, allowNull: true, },
    email: { type: DataTypes.STRING, allowNull: false, },
    password: { type: DataTypes.STRING, allowNull: false, },
    img: { type: DataTypes.STRING, allowNull: true, default: 'perfil.png' },
    cel: { type: DataTypes.STRING, allowNull: true, },
    telefono: { type: DataTypes.STRING, allowNull: true, },
    genero: { type: DataTypes.STRING, allowNull: true, },
    fechaNacimiento: { type: DataTypes.DATE, allowNull: true, },
    createdAt: { type: DataTypes.DATE, allowNull: true, default: Date.now },
    updatedAt: { type: DataTypes.DATE, allowNull: true, default: Date.now }
}, {
    tableName: 'clientes', // Nombre de la tabla en snake_case
    timestamps: true,
    // Esto convierte los nombres de columnas de camelCase a snake_case
    underscored: true,
    // Esto convierte los nombres de modelos de pascalCase a snake_case
    freezeTableName: true,
});


module.exports = Cliente;