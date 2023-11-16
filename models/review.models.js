const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Producto = require('./producto.models'); // Asegúrate de que el nombre del archivo sea correcto
const Cliente = require('./cliente.models'); // Asegúrate de que el nombre del archivo sea correcto
const Venta = require('./venta.models'); // Asegúrate de que el nombre del archivo sea correcto

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    review: { type: DataTypes.STRING, allowNull: false },
    estrellas: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'reviews', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

// Relaciones con otros modelos
Review.belongsTo(Producto, { foreignKey: 'productoId' });
Review.belongsTo(Cliente, { foreignKey: 'clienteId' });
Review.belongsTo(Venta, { foreignKey: 'ventaId' });

module.exports = Review;