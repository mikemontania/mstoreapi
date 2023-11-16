const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Config = sequelize.define('Config', {
    envioActivacion: { type: DataTypes.STRING, allowNull: false },
    montoMinSoles: { type: DataTypes.INTEGER, allowNull: false },
    montoMinDolares: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
    tableName: 'configs', // Nombre de la tabla en snake_case
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

module.exports = Config;
