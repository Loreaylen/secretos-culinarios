const { DataTypes } = require('sequelize')
const sequelize = require('../../database/connect.js')

const CategoriaReceta = sequelize.define('CategoriaReceta', {
  id_cr: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_receta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  sequelize,
  tableName: 'categorias_recetas',
  timestamps: false
})

module.exports = CategoriaReceta