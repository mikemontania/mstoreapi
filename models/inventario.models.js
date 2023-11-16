const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Producto = require('./producto.models'); // Asegúrate de que el nombre del archivo sea correcto
const Variedad = require('./variedad.models'); // Asegúrate de que el nombre del archivo sea correcto

const Inventario = sequelize.define('Inventario', {
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'inventarios', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

// Relaciones con otros modelos
Inventario.belongsTo(Producto, { foreignKey: 'productoId' });
Inventario.belongsTo(Variedad, { foreignKey: 'variedadId' });

module.exports = Inventario;
