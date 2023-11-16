const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Cliente = require('./cliente.models'); // Asegúrate de que el nombre del archivo sea correcto

const Direccion = sequelize.define('Direccion', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    nombres: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    referencia: { type: DataTypes.STRING, allowNull: true },
    pais: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: true },
    provincia: { type: DataTypes.STRING, allowNull: true },
    distrito: { type: DataTypes.STRING, allowNull: true },
    zona: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
    principal: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'direcciones', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

// Relaciones con otros modelos
Direccion.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Direccion;
