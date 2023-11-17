
const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const moment = require('moment');

const Producto = sequelize.define('Producto', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    titulo: { type: DataTypes.STRING, allowNull: false, },
    slug: { type: DataTypes.STRING, allowNull: false, },
    portada: { type: DataTypes.STRING, allowNull: false, },
    precio: { type: DataTypes.NUMERIC, allowNull: true, default: 0 },
    // precioAntesDolares: { type: DataTypes.NUMERIC, allowNull: true, default: 0 },
    sku: { type: DataTypes.STRING, allowNull: false, },
    descripcion: { type: DataTypes.STRING, allowNull: false, },
    contenido: { type: DataTypes.STRING, allowNull: false, },
    nventas: { type: DataTypes.NUMERIC, allowNull: true, default: 0 },
    categoria: { type: DataTypes.STRING, allowNull: false, },
    visibilidad: { type: DataTypes.STRING, allowNull: false, },
    stock: { type: DataTypes.NUMERIC, allowNull: true, default: 0 },
    galeria: { type: DataTypes.JSON, allowNull: true },  // Cambiado a JSON
    peso: { type: DataTypes.STRING, allowNull: false, },
    estado: { type: DataTypes.STRING, allowNull: true, default: 'Edicion' },
    createdAt: { type: DataTypes.DATE, allowNull: true, default: Date.NOW },

}, {
    tableName: 'productos', // Nombre de la tabla en snake_case
    timestamps: true,
    // Esto convierte los nombres de columnas de camelCase a snake_case
    underscored: true,
    // Esto convierte los nombres de modelos de pascalCase a snake_case
    freezeTableName: true,
});


module.exports = Producto;


