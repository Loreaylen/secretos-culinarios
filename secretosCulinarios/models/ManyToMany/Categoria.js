const { DataTypes } = require('sequelize')
const sequelize = require('../../database/connect.js')

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  tableName: 'categorias',
  timestamps: false
})

module.exports = Categoria;