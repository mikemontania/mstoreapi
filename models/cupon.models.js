const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Cupon = sequelize.define('Cupon', {
    codigo: { type: DataTypes.STRING, allowNull: false },
    disponibilidad: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.INTEGER, allowNull: false },
    limite: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'cupones', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

module.exports = Cupon;
