const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Cliente = require('./cliente.models'); // Asegúrate de que el nombre del archivo sea correcto
const Direccion = require('./direccion.models'); // Asegúrate de que el nombre del archivo sea correcto

const Venta = sequelize.define('Venta', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    subtotal: { type: DataTypes.INTEGER, allowNull: false },
    totalPagar: { type: DataTypes.NUMERIC, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    tracking: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    envioPrecio: { type: DataTypes.INTEGER, allowNull: false },
    transaccion: { type: DataTypes.STRING, allowNull: false },
    cupon: { type: DataTypes.STRING, allowNull: true },
    metodoPago: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    tipoDdescuento: { type: DataTypes.STRING, allowNull: true },
    valorDdescuento: { type: DataTypes.STRING, allowNull: true },
    nota: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'ventas', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

// Relaciones con otros modelos
Venta.belongsTo(Cliente, { foreignKey: 'clienteId' });
Venta.belongsTo(Direccion, { foreignKey: 'direccionId' });

module.exports = Venta;
