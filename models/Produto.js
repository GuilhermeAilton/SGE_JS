const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria'); // Certifique-se de que o caminho esteja correto

const Produto = sequelize.define('Produto', {
  produto_nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'categoria_id', // Certifique-se de que isso corresponda
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
});

Categoria.hasMany(Produto, { foreignKey: 'categoria_id' });
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

module.exports = Produto;
