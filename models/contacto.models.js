const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Contacto = sequelize.define('Contacto', {
    cliente: { type: DataTypes.STRING, allowNull: false },
    mensaje: { type: DataTypes.STRING, allowNull: false },
    asunto: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correo: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'contactos', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

module.exports = Contacto;
