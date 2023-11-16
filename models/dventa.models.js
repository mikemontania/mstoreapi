const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Producto = require('./producto.models'); // Asegúrate de que el nombre del archivo sea correcto
const Venta = require('./venta.models'); // Asegúrate de que el nombre del archivo sea correcto
const Variedad = require('./variedad.models'); // Asegúrate de que el nombre del archivo sea correcto
const Cliente = require('./cliente.models'); // Asegúrate de que el nombre del archivo sea correcto

const Dventa = sequelize.define('Dventa', {
    subtotal: { type: DataTypes.INTEGER, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'dventas', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

// Relaciones con otros modelos
Dventa.belongsTo(Producto, { foreignKey: 'productoId' });
Dventa.belongsTo(Venta, { foreignKey: 'ventaId' });
Dventa.belongsTo(Variedad, { foreignKey: 'variedadId' });
Dventa.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Dventa;
