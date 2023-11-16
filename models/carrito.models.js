const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Producto = require('./producto.models'); // Asegúrate de que el nombre del archivo sea correcto
const Cliente = require('./cliente.models'); // Asegúrate de que el nombre del archivo sea correcto
const Variedad = require('./variedad.models'); // Asegúrate de que el nombre del archivo sea correcto

const Carrito = sequelize.define('Carrito', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
  tableName: 'carritos', // Nombre de la tabla en snake_case
  timestamps: true,
  underscored: true,
  freezeTableName: true,
});

// Relaciones con otros modelos
Carrito.belongsTo(Producto, { foreignKey: 'productoId' });
Carrito.belongsTo(Cliente, { foreignKey: 'clienteId' });
Carrito.belongsTo(Variedad, { foreignKey: 'variedadId' });

module.exports = Carrito;
