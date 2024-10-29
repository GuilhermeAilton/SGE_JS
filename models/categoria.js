const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoria_nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Categoria;
