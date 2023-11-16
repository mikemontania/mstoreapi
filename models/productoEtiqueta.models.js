const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const Producto = require('./producto.models');
const Etiqueta = require('./etiqueta.models');
const ProductoEtiqueta = sequelize.define('ProductoEtiqueta', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, },
    // No es necesario definir un ID para las tablas intermedias
    createdAt: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    etiquetaId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'productos_etiquetas',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
});

ProductoEtiqueta.belongsTo(Producto, {
    foreignKey: 'productoId',
    targetKey: 'id',
    as: 'producto',
});

ProductoEtiqueta.belongsTo(Etiqueta, {
    foreignKey: 'etiquetaId',
    targetKey: 'id',
    as: 'etiqueta',
});
Producto.belongsToMany(Etiqueta, { through: ProductoEtiqueta, foreignKey: 'productoId', targetKey: 'id', as: 'producto', });
Etiqueta.belongsToMany(Producto, { through: ProductoEtiqueta, foreignKey: 'etiquetaId', targetKey: 'id', as: 'etiqueta', });

module.exports = ProductoEtiqueta;
