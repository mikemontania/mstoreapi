

const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Producto = require('./producto.models'); // Asegúrate de que el nombre del archivo sea correcto

const Variedad = sequelize.define('Variedad', {
    valor: { type: DataTypes.STRING, allowNull: false },
    stock: { type: DataTypes.STRING, allowNull: false, defaultValue: '0' },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'variedades', // Nombre de la tabla en snake_case
    timestamps: true,
    // Esto convierte los nombres de columnas de camelCase a snake_case
    underscored: true,
    // Esto convierte los nombres de modelos de pascalCase a snake_case
    freezeTableName: true,
});

// Relación con el modelo de Producto

Variedad.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = Variedad;